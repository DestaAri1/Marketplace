package handlers

import (
	"context"
	"time"

	"github.com/DestaAri1/models"
	"github.com/gofiber/fiber/v2"
)

type RegionalAddressHandler struct {
	BaseHandler
	repository models.RegionalAddressRepository
}

func (h *RegionalAddressHandler) GetProvinces(ctx *fiber.Ctx) error {
	context, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	provinces, err := h.repository.GetProvinces(context)
	if err != nil {
		return h.handlerError(ctx, fiber.StatusInternalServerError, err.Error())
	}

	return h.handlerSuccess(ctx, fiber.StatusOK, "", provinces)
}

func (h *RegionalAddressHandler) GetRegenciesByProvince(ctx *fiber.Ctx) error {
	context, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	provinceId := ctx.Params("provinceId")
	if provinceId == "" {
		return h.handlerError(ctx, fiber.StatusBadRequest, "Province ID is required")
	}

	regencies, err := h.repository.GetRegenciesByProvince(context, provinceId)
	if err != nil {
		return h.handlerError(ctx, fiber.StatusInternalServerError, err.Error())
	}

	return h.handlerSuccess(ctx, fiber.StatusOK, "", regencies)
}

func (h *RegionalAddressHandler) GetDistrictsByRegency(ctx *fiber.Ctx) error {
	context, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	regencyId := ctx.Params("regencyId")
	if regencyId == "" {
		return h.handlerError(ctx, fiber.StatusBadRequest, "Regency ID is required")
	}

	districts, err := h.repository.GetDistrictsByRegency(context, regencyId)
	if err != nil {
		return h.handlerError(ctx, fiber.StatusInternalServerError, err.Error())
	}

	return h.handlerSuccess(ctx, fiber.StatusOK, "", districts)
}

func (h *RegionalAddressHandler) GetVillagesByDistrict(ctx *fiber.Ctx) error {
	context, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	districtId := ctx.Params("districtId")
	if districtId == "" {
		return h.handlerError(ctx, fiber.StatusBadRequest, "District ID is required")
	}

	villages, err := h.repository.GetVillagesByDistrict(context, districtId)
	if err != nil {
		return h.handlerError(ctx, fiber.StatusInternalServerError, err.Error())
	}

	return h.handlerSuccess(ctx, fiber.StatusOK, "", villages)
}

func NewRegionalAddressHandler(router fiber.Router, repository models.RegionalAddressRepository) {
	handler := &RegionalAddressHandler{
		repository: repository,
	}

	router.Get("/provinces", handler.GetProvinces)
	router.Get("/regencies/:provinceId", handler.GetRegenciesByProvince)
	router.Get("/districts/:regencyId", handler.GetDistrictsByRegency)
	router.Get("/villages/:districtId", handler.GetVillagesByDistrict)
} 