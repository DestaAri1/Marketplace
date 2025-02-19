package handlers

import (
	"context"
	"strconv"
	"time"

	"github.com/DestaAri1/middlewares"
	"github.com/DestaAri1/models"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

type CategoryHandler struct {
	BaseHandler
	repository models.CategoryRepository
}

func (h *CategoryHandler) GetAllCategory(ctx *fiber.Ctx) error {
	context, cancel := context.WithTimeout(context.Background(), time.Duration(5*time.Second))
	defer cancel()

	category, err := h.repository.GetAllCategory(context)

	if err != nil {
		return h.handlerError(ctx, fiber.StatusUnprocessableEntity, "Something went wrong")
	}

	return h.handlerSuccess(ctx, fiber.StatusOK, "", category)
}
func (h *CategoryHandler) CreateCategory(ctx *fiber.Ctx) error {
	context, cancel := context.WithTimeout(context.Background(), time.Duration(5*time.Second))
	defer cancel()

	formData := &models.FormCategory{}

	if err := ctx.BodyParser(formData); err != nil {
		return h.handlerError(ctx, fiber.StatusUnprocessableEntity, err.Error())
	}

	validate := validator.New()
    if err := validate.Struct(formData); err != nil {
        return h.handleValidationError(ctx, err)
    }

	if _, err := h.repository.CreateCategory(context, formData); err != nil {
		return h.handlerError(ctx, fiber.StatusUnprocessableEntity, err.Error())
	}

	return h.handlerSuccess(ctx, fiber.StatusOK, "Category successfully created", nil)
}
func (h *CategoryHandler) UpdateCategory(ctx *fiber.Ctx) error {
	categoryId, err := strconv.Atoi(ctx.Params("categoryId"))

	if err != nil {
		return h.handlerError(ctx, fiber.StatusBadRequest, "invalid category ID")
	}

	context, cancel := context.WithTimeout(context.Background(), time.Duration(5*time.Second))
	defer cancel()

	updateData := make(map[string]interface{})
	if err := ctx.BodyParser(&updateData); err != nil {
		return h.handlerError(ctx, fiber.StatusUnprocessableEntity, err.Error())
	}

	formData := &models.FormCategory{}

	if err := mapToStruct(updateData, formData); err != nil {
		return h.handleValidationError(ctx, err)
	}

	validate := validator.New()
    if err := validate.Struct(formData); err != nil {
        return h.handleValidationError(ctx, err)
    }

	data, err := h.repository.UpdateCategory(context, updateData, uint(categoryId))
	
	if err != nil {
		return h.handlerError(ctx, fiber.StatusBadGateway, err.Error())
	}
	
	return h.handlerSuccess(ctx, fiber.StatusOK, "Data successfully updated", data)
}

func (h *CategoryHandler) DeleteCategory(ctx *fiber.Ctx) error {
	categoryId, err := strconv.Atoi(ctx.Params("categoryId"))
	if err != nil {
		return h.handlerError(ctx, fiber.StatusBadRequest, "invalid category ID")
	}

	context, cancel := context.WithTimeout(context.Background(), time.Duration(5*time.Second))
	defer cancel()

	if err := h.repository.DeleteCategory(context,uint(categoryId)); err != nil {
		return h.handlerError(ctx, fiber.StatusBadGateway, "something went wrong")
	}
	return h.handlerSuccess(ctx, fiber.StatusOK, "Data successfully deleted", nil)
}

func NewCategoryHandler(router fiber.Router, repository models.CategoryRepository, db *gorm.DB,) {
	handler := &CategoryHandler{
		repository: repository,
	}
	router.Get("/", handler.GetAllCategory)
	
	protected := router.Group("/").Use(middlewares.AuthProtected(db)).Use(middlewares.RoleAuthorization(db, models.Admin))
	
	protected.Post("/", handler.CreateCategory)
	protected.Patch("/update/:categoryId", handler.UpdateCategory)
	protected.Delete("/:categoryId", handler.DeleteCategory)
}