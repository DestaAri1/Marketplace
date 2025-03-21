package handlers

import (
	"context"
	"strconv"
	"time"

	"github.com/DestaAri1/models"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

type BiodataHandler struct {
	BaseHandler
	repository models.BiodataRepository
}

func (h *BiodataHandler) UpdateBiodata(ctx *fiber.Ctx) error {
	context, cancel := context.WithTimeout(context.Background(), time.Duration(5*time.Second))
	defer cancel()

	userId := uint(ctx.Locals("userId").(float64))

	biodataId, err := strconv.Atoi(ctx.Params("biodataId"))
	if err != nil {
		return h.handlerError(ctx, fiber.StatusUnprocessableEntity, "Invalid biodata ID")
	}

	// Initialize form data
	formData := &models.FormBiodata{}
	
	// Parse form data (works for both multipart and JSON)
	if err := ctx.BodyParser(formData); err != nil {
		return h.handlerError(ctx, fiber.StatusUnprocessableEntity, err.Error())
	}
	
	// Handle birthday date parsing if it's a string format
	if formData.Birthday == nil {
		// Check if birthday is provided as string
		var dateData struct {
			Birthday string `json:"birthday"`
		}
		if err := ctx.BodyParser(&dateData); err == nil && dateData.Birthday != "" {
			parsedTime, err := time.Parse("2006-01-02", dateData.Birthday)
			if err != nil {
				return h.handlerError(ctx, fiber.StatusBadRequest, "Invalid date format. Please use YYYY-MM-DD")
			}
			formData.Birthday = &parsedTime
		}
	}

	// Get image file if uploaded
	file, err := ctx.FormFile("image")
	if err == nil && file != nil {
		formData.Image = file
	}
	
	// Validate the form data
	validate := validator.New()
	if err := validate.Struct(formData); err != nil {
		return h.handleValidationError(ctx, err)
	}

	// Call repository to update data
	if err := h.repository.UpdateBiodata(context, formData, uint(biodataId), userId); err != nil {
		return h.handlerError(ctx, fiber.StatusUnprocessableEntity, err.Error())
	}

	return h.handlerSuccess(ctx, fiber.StatusOK, "Successfully update biodata", nil)
}

func NewBiodataHandler(router fiber.Router, repository models.BiodataRepository) {
	handler := &BiodataHandler{
		repository: repository,
	}

	router.Patch("/:biodataId", handler.UpdateBiodata)
}