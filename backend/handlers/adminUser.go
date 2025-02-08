package handlers

import (
	"context"
	"time"

	"github.com/DestaAri1/middlewares"
	"github.com/DestaAri1/models"
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

func(h *AdminUserHandler) GetAllUser(ctx fiber.Ctx) error{
	context, cancel := context.WithTimeout(context.Background(), time.Duration(5*time.Second))
	defer cancel()

	data, err := h.repository.GetAllUser(context)
	
	return nil
}

func(h *AdminUserHandler) UpgradeUser(ctx fiber.Ctx) error{
	return nil
}

func NewAdminUserHandler(router fiber.Router, repository models.AdminUserRepository, db *gorm.DB,) {
	handler := &AdminUserHandler{
		repository: repository,
	}

	protected := router.Group("/").Use(middlewares.AuthProtected(db)).Use(middlewares.RoleAuthorization(db, models.Admin))
	
	protected.Post("/upgrade", handler.GetAllUser)
	protected.Get("/list", handler.UpgradeUser)
}