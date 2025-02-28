package handlers

import (
	"context"
	"strconv"
	"time"

	"github.com/DestaAri1/models"
	"github.com/gofiber/fiber/v2"
)

type UserProductHandler struct {
	BaseHandler
	repository models.UserProductRepository
}

func(h *UserProductHandler) UserGetAllProduct(ctx *fiber.Ctx) error {
	context, cancel := context.WithTimeout(context.Background(), time.Duration(5*time.Second))
	defer cancel()

	products, err := h.repository.UserGetAllProduct(context)

	if err != nil {
		return h.handlerError(ctx, fiber.StatusUnprocessableEntity, "Something went wrong")
	}

	return h.handlerSuccess(ctx, fiber.StatusOK, "", products)
}

func(h *UserProductHandler) GetOneProduct(ctx *fiber.Ctx) error {
	context, cancel := context.WithTimeout(context.Background(), time.Duration(5*time.Second))
	defer cancel()

	productId, _ := strconv.Atoi(ctx.Params("id"))

	product, err := h.repository.GetOneProduct(context, uint(productId))

	if err != nil {
		return h.handlerError(ctx, fiber.StatusBadGateway, err.Error())
	}

	return h.handlerSuccess(ctx, fiber.StatusOK, "", product)
}

func NewUserProductHandler(router fiber.Router, repository models.UserProductRepository) {
	handler := &UserProductHandler{
		repository: repository,
	}

	router.Get("/", handler.UserGetAllProduct)
	router.Get("/:id", handler.GetOneProduct)
}