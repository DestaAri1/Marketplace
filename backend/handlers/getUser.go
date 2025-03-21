// handlers/user_handler.go
package handlers

import (
	"context"

	"github.com/DestaAri1/models"
	"github.com/gofiber/fiber/v2"
)

type GetUserHandler struct {
	repository models.AuthRepository
}

func (h *GetUserHandler) response(ctx *fiber.Ctx, status int, message string, data interface{}) error {
	var status2 string

	if status == fiber.StatusOK {
		status2 = "success"
	} else if status == fiber.StatusInternalServerError {
		status2 = "error"
	} else {
		status2 = "fail"
	}
	
	return ctx.Status(status).JSON(&fiber.Map{
		"status": status2,
		"message": message,
		"data": data,
	})
}

func (h *GetUserHandler) getUser(ctx *fiber.Ctx) error {
	userId, ok := ctx.Locals("userId").(float64)

	if !ok {
		return h.response(ctx, fiber.StatusUnauthorized, "Failed to get user ID from token", nil)
	}

	user, err := h.repository.GetUser(context.Background(), "id = ?", uint(userId))
	if err != nil {
		return h.response(ctx, fiber.StatusInternalServerError, "Internal Server Error", nil)
	}

	if user == nil {
		return h.response(ctx, fiber.StatusNotFound, "User not found", nil)
	}

	// Create a response with explicitly included biodata
	responseData := map[string]interface{}{
		"id":        user.Id,
		"username":  user.Username,
		"email":     user.Email,
		"role":      user.Role,
		"biodata":   user.Biodata,
	}

	return h.response(ctx, fiber.StatusOK, "User data retrieved successfully", responseData)
}

func NewGetUserHandler(router fiber.Router, repository models.AuthRepository) {
	handler := &GetUserHandler{
		repository: repository,
	}
	router.Get("/getUser", handler.getUser)
}