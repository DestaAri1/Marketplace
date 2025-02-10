package handlers

import (
	"context"
	"errors"
	"fmt"
	"time"

	"github.com/DestaAri1/middlewares"
	"github.com/DestaAri1/models"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

type AdminUserHandler struct {
	repository models.AdminUserRepository
}

func (h *AdminUserHandler) handlerError(ctx *fiber.Ctx, status int, message string) error {
	return ctx.Status(status).JSON(&fiber.Map{
		"status":  "fail",
		"message": message,
	})
}

func (h *AdminUserHandler) handlerSuccess(ctx *fiber.Ctx, status int, message string, data interface{}) error {
	return ctx.Status(status).JSON(&fiber.Map{
		"status" : "success",
		"message" : message,
		"data" : data,
	})
}

func (h *AdminUserHandler) handleValidationError(ctx *fiber.Ctx, err error) error {
	var ve validator.ValidationErrors
	if errors.As(err, &ve) {
		for _, err := range ve {
			var message string
			switch err.Field() {
			case "Role":
				switch err.Tag() {
				case "required":
					message = fmt.Errorf("role field is required").Error()
				case "numeric":
					message = fmt.Errorf("only numeric").Error()
				}
				return h.handlerError(ctx, fiber.StatusBadRequest, message)
			case "UserId":
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

func(h *AdminUserHandler) GetAllUser(ctx *fiber.Ctx) error{
	context, cancel := context.WithTimeout(context.Background(), time.Duration(5*time.Second))
	defer cancel()

	data, err := h.repository.GetAllUser(context)
	
	if err != nil {
		return h.handlerError(ctx, fiber.StatusBadRequest, err.Error())
	}

	return h.handlerSuccess(ctx, fiber.StatusOK, "", data)
}

func(h *AdminUserHandler) UpgradeUser(ctx *fiber.Ctx) error{
	context, cancel := context.WithTimeout(context.Background(), time.Duration(5*time.Second))
    defer cancel()

    userId := ctx.Locals("userId")
    if userId == nil {
        return h.handlerError(ctx, fiber.StatusUnauthorized, "Unauthorized, userId not found")
    }

	formData := &models.FormRequestUpgradeUser{}
    if err := ctx.BodyParser(formData); err != nil {
        return h.handlerError(ctx, fiber.StatusUnprocessableEntity, err.Error())
    }

	validate := validator.New()
    if err := validate.Struct(formData); err != nil {
        return h.handleValidationError(ctx, err)
    }

	userIdUint := uint(formData.UserId)

	if userIdUint == uint(models.Admin) {
		return h.handlerError(ctx, fiber.StatusBadGateway, "unchangeable")
	}

	_, err := h.repository.UpgradeUser(context, formData, userIdUint)

	if err != nil {
		return h.handlerError(ctx, fiber.StatusBadGateway, err.Error())
	}
	
	return h.handlerSuccess(ctx, fiber.StatusOK, "Successfully upgrade a user", nil)
}

func NewAdminUserHandler(router fiber.Router, repository models.AdminUserRepository, db *gorm.DB,) {
	handler := &AdminUserHandler{
		repository: repository,
	}

	protected := router.Group("/").Use(middlewares.AuthProtected(db)).Use(middlewares.RoleAuthorization(db, models.Admin))
	
	protected.Get("/list", handler.GetAllUser)
	protected.Post("/upgrade_user", handler.UpgradeUser)
}