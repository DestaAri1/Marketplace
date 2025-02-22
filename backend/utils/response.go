package utils

import (
	"errors"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

func HandlerError(ctx *fiber.Ctx, status int, message string) error {
	return ctx.Status(status).JSON(fiber.Map{
		"status":  "fail",
		"message": message,
	})
}

// HandlerSuccess mengembalikan response JSON sukses
func HandlerSuccess(ctx *fiber.Ctx, status int, message string, data interface{}) error {
	return ctx.Status(status).JSON(fiber.Map{
		"status":  "success",
		"message": message,
		"data":    data,
	})
}

// HandleValidationError menangani error validasi dari validator
func HandleValidationError(ctx *fiber.Ctx, err error) error {
	var ve validator.ValidationErrors
	if errors.As(err, &ve) {
		for _, err := range ve {
			var message string
			switch err.Field() {
			case "Name":
				message = handleNameValidation(err.Tag())
			case "Stock":
				message = handleStockValidation(err.Tag())
			case "Price":
				message = handlePriceValidation(err.Tag())
			case "Category":
				message = handleCategoryValdation(err.Tag())
			case "Status" :
				message = handleStatusValidation(err.Tag())
			case "Description":
				if err.Tag() == "max" {
					message = "Maximum 500 characters"
				}
			}
			if message != "" {
				return HandlerError(ctx, fiber.StatusBadRequest, message)
			}
		}
	}
	return nil
}

func handleNameValidation(tag string) string {
	switch tag {
	case "required":
		return "Name field is required"
	case "min":
		return "Minimum 3 characters"
	case "max":
		return "Maximum 100 characters"
	}
	return ""
}

func handleStockValidation(tag string) string {
	switch tag {
	case "required":
		return "Stock field is required"
	case "numeric":
		return "Only numeric values allowed"
	case "min":
		return "Minimum stock is 1"
	}
	return ""
}

func handlePriceValidation(tag string) string {
	switch tag {
	case "required":
		return "Price field is required"
	case "numeric":
		return "Only numeric values allowed"
	case "gt":
		return "Cannot input 0 for price"
	}
	return ""
}

func handleCategoryValdation(tag string) string{
	switch tag {
	case "required":
		return "Category field is required"
	case "numeric":
		return "Only numeric values allowed"
	case "gt":
		return "choose the right category"
	}
	return ""
}

func handleStatusValidation(tag string) string {
	switch tag {
	case "required":
		return "Status is required"
	case "numeric":
		return "status only number"
	}
	return ""
}
