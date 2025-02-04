package handlers

import (
	"context"
	"time"

	"github.com/DestaAri1/models"
	"github.com/gofiber/fiber/v2"
)

type SellerHandler struct {
	repository models.SellerRequestRepository
	user models.AuthRepository
}

func (h *SellerHandler) handlerError(ctx *fiber.Ctx, status int, message string) error {
	return ctx.Status(status).JSON(&fiber.Map{
		"status": "fail",
		"message" : message,
	})
}

func (h *SellerHandler) handlerSuccess(ctx *fiber.Ctx, status int, message string, data interface{}) error {
	return ctx.Status(status).JSON(&fiber.Map{
		"status" : "success",
		"message" : message,
		"data" : data,
	})
}

func (h *SellerHandler) SellerRequest(ctx *fiber.Ctx) error{
	context, cancel := context.WithTimeout(context.Background(), time.Duration(5*time.Second))
    defer cancel()

    userId := ctx.Locals("userId")
    if userId == nil {
        return h.handlerError(ctx, fiber.StatusUnauthorized, "Unauthorized, userId not found")
    }
	
    userIdUint := uint(userId.(float64))

	user, err := h.user.GetUser(context, "id = ?", userId)
	if err != nil {
		return h.handlerError(ctx, fiber.StatusInternalServerError, "Internal Server Error")
	}

	if user.Role != nil && *user.Role != 2 {
		return h.handlerError(ctx, fiber.StatusBadGateway, "Invalid User")
	}
    
    // Create seller request with just the user ID
    seller := &models.Seller_Request{
        UserID: int(userIdUint),
    }

    createdTicket, err := h.repository.SellerRequest(context, seller, userIdUint)
    if err != nil {
        return h.handlerError(ctx, fiber.StatusBadGateway, err.Error())
    }

    return h.handlerSuccess(ctx, fiber.StatusCreated, "Request has been sended!", createdTicket)
}

func NewSellerHandler(router fiber.Router, repository models.SellerRequestRepository, user models.AuthRepository) {
	handler := &SellerHandler{
		repository: repository,
		user: user,
	}
	
	router.Post("/upgrade", handler.SellerRequest)
}

