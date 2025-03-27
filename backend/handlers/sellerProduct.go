package handlers

import (
	"bytes"
	"context"
	"encoding/json"
	"strconv"
	"time"

	"github.com/DestaAri1/middlewares"
	"github.com/DestaAri1/models"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

type SellerProductHandler struct {
	BaseHandler
	repository models.SellerProductRepository
}

func (h *SellerProductHandler) GetAllProduct(ctx *fiber.Ctx) error {
	context, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	userId := ctx.Locals("userId")
    if userId == nil {
        return h.handlerError(ctx, fiber.StatusUnauthorized, "Unauthorized, userId not found")
    }

	userIdUint := uint(userId.(float64))

	data, err := h.repository.GetAllProduct(context, userIdUint)
	if err != nil {
		return h.handlerError(ctx, fiber.StatusBadRequest, err.Error())
	}

	return h.handlerSuccess(ctx, fiber.StatusOK, "", data)
}

func (h *SellerProductHandler) CreateOneProduct(ctx *fiber.Ctx) error {
	context, cancel := context.WithTimeout(context.Background(), time.Duration(5*time.Second))
	defer cancel()

	userId := ctx.Locals("userId")
    if userId == nil {
        return h.handlerError(ctx, fiber.StatusUnauthorized, "Unauthorized, userId not found")
    }

	userIdUint := uint(userId.(float64))

	formData := &models.FormCreateProduct{}

	if err := ctx.BodyParser(formData); err != nil {
		return h.handlerError(ctx, fiber.StatusUnprocessableEntity, err.Error())
	}

	validate := validator.New()
    if err := validate.Struct(formData); err != nil {
        return h.handleValidationError(ctx, err)
    }

	_, err := h.repository.CreateOneProduct(context, formData, userIdUint)

	if err != nil {
		return h.handlerError(ctx, fiber.StatusBadGateway, err.Error())
	}
	
	return h.handlerSuccess(ctx, fiber.StatusOK, "Successfully create a product", nil)
}

func (h *SellerProductHandler) UpdateProduct(ctx *fiber.Ctx) error {
	productId, err := strconv.Atoi(ctx.Params("productId"))
	if err != nil {
		return h.handlerError(ctx, fiber.StatusBadRequest, "invalid product ID")
	}

	context, cancel := context.WithTimeout(context.Background(), time.Duration(5*time.Second))
	defer cancel()

	userId := ctx.Locals("userId")
	if userId == nil {
		return h.handlerError(ctx, fiber.StatusUnauthorized, "userId not found")
	}
	userIdUint := uint(userId.(float64))

	// Create a struct to parse form data
	updateData := &models.FormCreateProduct{}

	// Parse form data
	if err := ctx.BodyParser(updateData); err != nil {
		return h.handlerError(ctx, fiber.StatusUnprocessableEntity, err.Error())
	}

	// Handle file upload separately
	file, err := ctx.FormFile("image")
	if err == nil && file != nil {
		updateData.ImageFile = file
	}

	// Validate the struct
	validate := validator.New()
	if err := validate.Struct(updateData); err != nil {
		return h.handleValidationError(ctx, err)
	}

	// Update product
	product, err := h.repository.UpdateProduct(context, updateData, uint(productId), userIdUint)
	if err != nil {
		return h.handlerError(ctx, fiber.StatusBadGateway, err.Error())
	}
	
	return h.handlerSuccess(ctx, fiber.StatusOK, "Data has been updated", product)
}

func (h *SellerProductHandler) UpdateStatusProduct(ctx *fiber.Ctx) error {
	// Konversi productId dari parameter URL
	productId, err := strconv.Atoi(ctx.Params("productId"))
	if err != nil {
		return h.handlerError(ctx, fiber.StatusBadRequest, "invalid product ID")
	}

	// Set context dengan timeout
	context, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Ambil userId dari context
	userId := ctx.Locals("userId")
	if userId == nil {
		return h.handlerError(ctx, fiber.StatusUnauthorized, "userId not found")
	}
	userIdUint := uint(userId.(float64))

	// Membaca body request manual menggunakan json.Decoder
	var formData models.FormStatusProduct
	bodyReader := bytes.NewReader(ctx.Body()) // Konversi []byte ke io.Reader
	decoder := json.NewDecoder(bodyReader)
	decoder.DisallowUnknownFields() // Menolak field lain selain 'status'
	
	if err := decoder.Decode(&formData); err != nil {
		return h.handlerError(ctx, fiber.StatusBadRequest, "Only 'status' field is allowed")
	}

	// Validasi field `status` wajib dikirim
	validate := validator.New()
	if err := validate.Struct(&formData); err != nil {
		return h.handleValidationError(ctx, err)
	}

	// Pastikan hanya 'status' yang dikirim ke database
	updateData := &models.FormCreateProduct{
		Status: formData.Status,
	}

	// Update status produk
	product, err := h.repository.UpdateProduct(context, updateData, uint(productId), userIdUint)
	if err != nil {
		return h.handlerError(ctx, fiber.StatusBadGateway, err.Error())
	}

	// Berhasil mengupdate status produk
	return h.handlerSuccess(ctx, fiber.StatusOK, "Product status has been updated", product)
}


func (h *SellerProductHandler) GetOneProduct(ctx *fiber.Ctx) error {
	context, cancel := context.WithTimeout(context.Background(), time.Duration(5*time.Second))
	defer cancel()

	productId, _ := strconv.Atoi(ctx.Params("productId"))

	userId := uint(ctx.Locals("userId").(float64))

	product, err := h.repository.GetOneProduct(context, uint(productId), userId)

	if err != nil {
		return h.handlerError(ctx, fiber.StatusBadGateway, err.Error())
	}

	return h.handlerSuccess(ctx, fiber.StatusOK, "", product)
}

func (h *SellerProductHandler) DeleteProduct(ctx *fiber.Ctx) error {
	context, cancel := context.WithTimeout(context.Background(), time.Duration(5*time.Second))
	defer cancel()

	productId, _ := strconv.Atoi(ctx.Params("productId"))

	userId := uint(ctx.Locals("userId").(float64))

	if err := h.repository.DeleteProduct(context, uint(productId), userId); err != nil {
		return h.handlerError(ctx, fiber.StatusUnprocessableEntity, "Something went wrong")
	}
	
	return h.handlerSuccess(ctx, fiber.StatusOK, "Data successfully delete", nil)
} 

func mapToStruct(m map[string]interface{}, s interface{}) error {
	data, err := json.Marshal(m)
	if err != nil {
		return err
	}
	return json.Unmarshal(data, s)
}

func NewSellerProductHandler(router fiber.Router, repository models.SellerProductRepository, db *gorm.DB,) {
	handler := &SellerProductHandler{
		repository: repository,
	}

	protected := router.Group("/").Use(middlewares.AuthProtected(db)).Use(middlewares.RoleAuthorization(db, models.Seller))
	
	protected.Get("/", handler.GetAllProduct)
	protected.Post("/", handler.CreateOneProduct)
	protected.Get("/:productId", handler.GetOneProduct)
	protected.Patch("/update/:productId", handler.UpdateProduct)
	protected.Patch("/update/status/:productId", handler.UpdateStatusProduct)
	protected.Delete("/:productId", handler.DeleteProduct)
}