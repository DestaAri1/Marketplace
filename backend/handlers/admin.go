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
        // Log error untuk debugging
        log.Printf("Error getting seller requests: %v", err)
        return h.handlerError(ctx, fiber.StatusBadGateway, err.Error())
    }

    // Tambahkan debug log
    log.Printf("Found %d seller requests", len(res))

    return h.handlerSuccess(ctx, fiber.StatusOK, "Seller Requests", res)
}

func (h *AdminHandler) AcceptRequest(ctx *fiber.Ctx) error {
	context, cancel := context.WithTimeout(context.Background(), time.Duration(5*time.Second))
    defer cancel()

    userId := ctx.Locals("userId")
    if userId == nil {
        return h.handlerError(ctx, fiber.StatusUnauthorized, "Unauthorized, userId not found")
    }
	
    formData := &models.FormRequestSeller{}
	
	if err := ctx.BodyParser(formData); err != nil {
		return h.handlerError(ctx, fiber.StatusUnprocessableEntity, err.Error())
	}
	
	if err := validator.New().Struct(formData); err != nil {
		return h.handleValidationError(ctx, err)
	}

	userIdUint := uint(formData.UserID)
	
	_, err := h.repository.AcceptRequest(context, userIdUint)
    if err != nil {
        return h.handlerError(ctx, fiber.StatusBadGateway, err.Error())
    }

    return h.handlerSuccess(ctx, fiber.StatusCreated, "Request has been accepted!", nil)
}

func NewAdminHandler(router fiber.Router, repository models.AdminRepository, db *gorm.DB,) {
	handler := &AdminHandler{
		repository: repository,
	}

	protected := router.Group("/").Use(middlewares.AuthProtected(db)).Use(middlewares.RoleAuthorization(db, models.Admin))
	
	protected.Post("/upgrade", handler.AcceptRequest)
	protected.Get("/list", handler.GetAllRequest)
}