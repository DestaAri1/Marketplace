package models

import "context"

type Category struct {
	Base
	Name 	string `json:"name"`
}

type FormCategory struct {
	Name	string	`json:"name" validate:"required"` 
}

type CategoryResponse struct {
	Name	string	`json:"name"`
}

type CategoryRepository interface {
	GetAllCategory(ctx context.Context) ([]*CategoryResponse, error)
	CreateCategory(ctx context.Context, formData *FormCategory) (*Category, error)
	UpdateCategory(ctx context.Context, updateData map[string]interface{}, catId uint) (*Category, error)
	DeleteCategory(ctx context.Context, catId uint) error
}