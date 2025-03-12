package handlers

import (
	"context"
	"strconv"
	"time"

	"github.com/DestaAri1/models"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

type AddressHandler struct {
	BaseHandler
	repository models.AddressRepository
	BaseRepository models.BaseRepository
}

func (h *AddressHandler) GetAllAddress(ctx *fiber.Ctx) error {
	context, cancel := context.WithTimeout(context.Background(), time.Duration(5*time.Second))
    defer cancel()

	userId := ctx.Locals("userId")
    if userId == nil {
        return h.handlerError(ctx, fiber.StatusUnauthorized, "Unauthorized, userId not found")
    }

	uintUserId := uint(userId.(float64))

    res, err := h.repository.GetAllAddress(context, uintUserId)
    if err != nil {
        return h.handlerError(ctx, fiber.StatusBadGateway, err.Error())
    }

    return h.handlerSuccess(ctx, fiber.StatusOK, "Seller Requests", res)
}

func (h *AddressHandler) CreateAddress(ctx *fiber.Ctx) error {
	context, cancel := context.WithTimeout(context.Background(), time.Duration(5*time.Second))
	defer cancel()

	userId := ctx.Locals("userId")

	uintUserId := uint(userId.(float64))
	
	formData := &models.FormAddress{}

	if err := ctx.BodyParser(formData); err != nil {
		return h.handlerError(ctx, fiber.StatusUnprocessableEntity, err.Error())
	}

	validate := validator.New()
    if err := validate.Struct(formData); err != nil {
        return h.handleValidationError(ctx, err)
    }

	if h.BaseRepository == nil {
		return h.handlerError(ctx, fiber.StatusInternalServerError, "Repository not initialized")
	}

	// Check if location IDs are valid
	if formData.Province == "" || !h.BaseRepository.IsValidID("provinces", formData.Province) {
		return h.handlerError(ctx, fiber.StatusBadRequest, "No province Data")
	}

	if formData.Regency == "" || !h.BaseRepository.IsValidID("regencies", formData.Regency) {
		return h.handlerError(ctx, fiber.StatusBadRequest, "No regency Data")
	}

	if formData.District == "" || !h.BaseRepository.IsValidID("districts", formData.District) {
		return h.handlerError(ctx, fiber.StatusBadRequest, "No district Data")
	}

	if formData.Village == "" || !h.BaseRepository.IsValidID("villages", formData.Village) {
		return h.handlerError(ctx, fiber.StatusBadRequest, "No village Data")
	}
	
	res := h.repository.CreateAddress(context, formData, uintUserId )

	if res != nil {
		return h.handlerError(ctx, fiber.StatusUnprocessableEntity, res.Error())
	}

	return h.handlerSuccess(ctx, fiber.StatusOK, "Successfully add address", nil)
}

func (h *AddressHandler) UpdateAddress(ctx *fiber.Ctx) error {
	context, cancel := context.WithTimeout(context.Background(), time.Duration(5*time.Second))
	defer cancel()

	addressId, err := strconv.Atoi(ctx.Params("addressId"))

	if err != nil {
		return h.handlerError(ctx, fiber.StatusUnprocessableEntity, "Data not found")
	}

	userId := uint(ctx.Locals("userId").(float64))

	formData := &models.FormAddress{}

	if err := ctx.BodyParser(formData); err != nil {
		return h.handlerError(ctx, fiber.StatusUnprocessableEntity, err.Error())
	}

	validate := validator.New()
    if err := validate.Struct(formData); err != nil {
        return h.handleValidationError(ctx, err)
    }

	if h.BaseRepository == nil {
		return h.handlerError(ctx, fiber.StatusInternalServerError, "Repository not initialized")
	}

	// Check if location IDs are valid
	if formData.Province == "" || !h.BaseRepository.IsValidID("provinces", formData.Province) {
		return h.handlerError(ctx, fiber.StatusBadRequest, "No province Data")
	}

	if formData.Regency == "" || !h.BaseRepository.IsValidID("regencies", formData.Regency) {
		return h.handlerError(ctx, fiber.StatusBadRequest, "No regency Data")
	}

	if formData.District == "" || !h.BaseRepository.IsValidID("districts", formData.District) {
		return h.handlerError(ctx, fiber.StatusBadRequest, "No district Data")
	}

	if formData.Village == "" || !h.BaseRepository.IsValidID("villages", formData.Village) {
		return h.handlerError(ctx, fiber.StatusBadRequest, "No village Data")
	}
	
	res := h.repository.UpdateAddress(context, formData, uint(addressId), userId)

	if res != nil {
		return h.handlerError(ctx, fiber.StatusUnprocessableEntity, res.Error())
	}

	return h.handlerSuccess(ctx, fiber.StatusOK, "Successfully update address", nil)
}

func (h *AddressHandler) UpdateStatusAddress(ctx *fiber.Ctx) error {
	context, cancel := context.WithTimeout(context.Background(), time.Duration(5 * time.Second))
	defer cancel()

	userId := ctx.Locals("userId").(float64)

	addressId, err := strconv.Atoi(ctx.Params("addressId"))

	if err != nil {
		return h.handlerError(ctx, fiber.StatusUnprocessableEntity, "Data not found")
	}

	formData := &models.FormStatusAddress{}
	
	if err := ctx.BodyParser(formData); err != nil {
		return h.handlerError(ctx, fiber.StatusUnprocessableEntity, err.Error())
	}

	validate := validator.New()
    if err := validate.Struct(formData); err != nil {
        return h.handleValidationError(ctx, err)
    }

	res := h.repository.UpdateStatusAddress(context, formData, uint(addressId), uint(userId))

	if res != nil {
		return h.handlerError(ctx, fiber.StatusUnprocessableEntity, res.Error())
	}

	return h.handlerSuccess(ctx, fiber.StatusOK, "Successfully update status", nil)
}

func (h *AddressHandler) DeleteAddress(ctx *fiber.Ctx) error {
	context, cancel := context.WithTimeout(context.Background(), time.Duration(5 * time.Second))
	defer cancel()

	userId := ctx.Locals("userId").(float64)

	addressId, err := strconv.Atoi(ctx.Params("addressId"))

	if err != nil {
		return h.handlerError(ctx, fiber.StatusUnprocessableEntity, "Data not found")
	}

	res := h.repository.DeleteAddress(context, uint(addressId), uint(userId))

	if res != nil {
		return h.handlerError(ctx, fiber.StatusUnprocessableEntity, res.Error())
	}

	return h.handlerSuccess(ctx, fiber.StatusOK, "Successfully delete address", nil)
}

func NewAddressHandler (router fiber.Router, repository models.AddressRepository, baseRepository models.BaseRepository) {	
	handler := &AddressHandler{
		repository: repository,
		BaseRepository: baseRepository,
	}

	router.Get("/", handler.GetAllAddress)
	router.Post("/", handler.CreateAddress)
	router.Patch("/:addressId", handler.UpdateAddress)
	router.Patch("/status/:addressId", handler.UpdateStatusAddress)
	router.Delete("/:addressId", handler.DeleteAddress)
}