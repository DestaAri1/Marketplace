package handlers

import (
	"github.com/DestaAri1/utils"
	"github.com/gofiber/fiber/v2"
)

type BaseHandler struct{}

func (h *BaseHandler) handlerError(ctx *fiber.Ctx, status int, message string) error {
	return utils.HandlerError(ctx, status, message)
}

func (h *BaseHandler) handlerSuccess(ctx *fiber.Ctx, status int, message string, data interface{}) error {
	return utils.HandlerSuccess(ctx, status, message, data)
}

func (h *BaseHandler) handleValidationError(ctx *fiber.Ctx, err error) error {
	return utils.HandleValidationError(ctx, err)
}