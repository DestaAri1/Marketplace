package handlers

import (
	"context"
	"strconv"
	"time"

	"github.com/DestaAri1/models"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

type CartHandler struct {
	BaseHandler
	repository models.CartRepository
}

func (h *CartHandler) CreateCart(ctx *fiber.Ctx) error {
	context, cancel :=  context.WithTimeout(context.Background(), time.Duration(5*time.Second))
	defer cancel()

	userId := ctx.Locals("userId")

	if userId == nil {
		return h.handlerError(ctx, fiber.StatusUnauthorized, "User Id not found")
	}

	userIdUint := uint(userId.(float64))

	formData := new(models.FormCreateCart)

	if err := ctx.BodyParser(formData); err != nil {
		return h.handlerError(ctx, fiber.StatusUnprocessableEntity, err.Error())
	}

	validate := validator.New()
    if err := validate.Struct(formData); err != nil {
        return h.handleValidationError(ctx, err)
    }

	err := h.repository.CreateCart(context, formData, userIdUint)

	if err != nil {
		return h.handlerError(ctx, fiber.StatusUnprocessableEntity, err.Error())
	}

	return h.handlerSuccess(ctx, fiber.StatusOK, "Cart successfully created", nil)
}

func (h *CartHandler) GetCart(ctx *fiber.Ctx) error {
	context, cancel :=  context.WithTimeout(context.Background(), time.Duration(5*time.Second))
	defer cancel()

	userId := ctx.Locals("userId")

	if userId == nil {
		return h.handlerError(ctx, fiber.StatusUnauthorized, "User Id not found")
	}

	userIdUint := uint(userId.(float64))

	data, err := h.repository.GetCart(context, userIdUint)

	if err != nil {
		return h.handlerError(ctx, fiber.StatusUnprocessableEntity, err.Error())
	}

	return h.handlerSuccess(ctx, fiber.StatusOK, "", data)
}

func (h *CartHandler) DeleteCart(ctx *fiber.Ctx) error {
	context, cancel := context.WithTimeout(context.Background(), time.Duration(5*time.Second))
	defer cancel()

	cartId ,err:= strconv.Atoi(ctx.Params("cartId"))

	if err != nil {
		return h.handlerError(ctx, fiber.StatusUnprocessableEntity, "something went wrong")
	}

	userId := ctx.Locals("userId")

	if userId == nil {
		return h.handlerError(ctx, fiber.StatusUnauthorized, "user not found")
	}

	userIdUint := uint(userId.(float64))

	res := h.repository.DeleteCart(context, uint(cartId), userIdUint)

	if res != nil {
		return h.handlerError(ctx, fiber.StatusUnprocessableEntity, res.Error())
	}

	return h.handlerSuccess(ctx, fiber.StatusOK, "Cart successfully deleted", nil)
}

func NewCartHandler(router fiber.Router, repository models.CartRepository) {
	handler := &CartHandler{
		repository: repository,
	}

	router.Get("/", handler.GetCart)
	router.Post("/", handler.CreateCart)
	router.Delete("/:cartId", handler.DeleteCart)
}