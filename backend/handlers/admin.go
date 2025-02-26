package handlers

import (
	"context"
	"errors"
	"fmt"
	"log"
	"time"

	"github.com/DestaAri1/middlewares"
	"github.com/DestaAri1/models"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

type AdminHandler struct {
	repository models.AdminRepository
}

func (h *AdminHandler) handlerError(ctx *fiber.Ctx, status int, message string) error {
	return ctx.Status(status).JSON(&fiber.Map{
		"status":  "fail",
		"message": message,
	})
}

func (h *AdminHandler) handlerSuccess(ctx *fiber.Ctx, status int, message string, data interface{}) error {
	return ctx.Status(status).JSON(&fiber.Map{
		"status" : "success",
		"message" : message,
		"data" : data,
	})
}

func (h *AdminHandler) handleValidationError(ctx *fiber.Ctx, err error) error {
	var ve validator.ValidationErrors
	if errors.As(err, &ve) {
		for _, err := range ve {
			var message string
			switch err.Field() {
			case "UserID":
				switch err.Tag() {
				case "required":
					message = fmt.Errorf("id field is required").Error()
				case "numeric":
					message = fmt.Errorf("only numeric").Error()
				}
				return h.handlerError(ctx, fiber.StatusBadRequest, message)
			case "Status":
				switch err.Tag() {
				case "required":
					message = fmt.Errorf("status field is required").Error()
				}
				return h.handlerError(ctx, fiber.StatusBadRequest, message)
			}
		}
	}
	return nil
}

func (h *AdminHandler) GetAllRequest(ctx *fiber.Ctx) error {
    context, cancel := context.WithTimeout(context.Background(), time.Duration(5*time.Second))
    defer cancel()

    res, err := h.repository.GetAllRequest(context)
    if err != nil {
        return h.handlerError(ctx, fiber.StatusBadGateway, err.Error())
    }

    // Tambahkan debug log
    log.Printf("Found %d seller requests", len(res))

    return h.handlerSuccess(ctx, fiber.StatusOK, "Seller Requests", res)
}

func (h *AdminHandler) AcceptRequest(ctx *fiber.Ctx) error {
	context, cancel := context.WithTimeout(context.Background(), time.Duration(5*time.Second))
    defer cancel()

    // Validate user authentication
    userId := ctx.Locals("userId")
    if userId == nil {
        return h.handlerError(ctx, fiber.StatusUnauthorized, "Unauthorized, userId not found")
    }

    // Parse request body
    formData := &models.FormRequestSeller{}
    if err := ctx.BodyParser(formData); err != nil {
        return h.handlerError(ctx, fiber.StatusUnprocessableEntity, err.Error())
    }

    // Validate struct
    validate := validator.New()
    if err := validate.Struct(formData); err != nil {
        return h.handleValidationError(ctx, err)
    }

    // Validate status and reason
    if formData.Status == 1{
        if formData.Reason == "" {
            return h.handlerError(ctx, fiber.StatusBadRequest, "Reason is required when rejecting request")
        }
    }

    userIdUint := uint(formData.UserID)

    // Process the request
    _, err := h.repository.AcceptRequest(context, formData, userIdUint)
    if err != nil {
        if errors.Is(err, gorm.ErrRecordNotFound) {
            return h.handlerError(ctx, fiber.StatusNotFound, "User not found")
        }
        return h.handlerError(ctx, fiber.StatusInternalServerError, "Failed to process request")
    }

    // Return appropriate success message based on status
    successMsg := "Request has been rejected"
    if formData.Status == 2 {
        successMsg = "Request has been accepted!"
    }

    return h.handlerSuccess(ctx, fiber.StatusOK, successMsg, nil)
}

func NewAdminHandler(router fiber.Router, repository models.AdminRepository, db *gorm.DB,) {
	handler := &AdminHandler{
		repository: repository,
	}

	protected := router.Group("/").Use(middlewares.AuthProtected(db)).Use(middlewares.RoleAuthorization(db, models.Admin))
	
	protected.Post("/upgrade", handler.AcceptRequest)
	protected.Get("/list", handler.GetAllRequest)
}