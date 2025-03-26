package models

import (
	"context"

	"gorm.io/gorm"
)

type Category struct {
	Base
	Name 		string `json:"name" gorm:"not null"`
	DeletedAt   gorm.DeletedAt `json:"deleted_at" gorm:"index"`
}

type FormCategory struct {
	Name	string	`json:"name" validate:"required"` 
}

type CategoryResponse struct {
	Id		uint	`json:"id"`
	Name	string	`json:"name"`
}

type CategoryRepository interface {
	GetAllCategory(ctx context.Context) ([]*CategoryResponse, error)
	CreateCategory(ctx context.Context, formData *FormCategory) (*Category, error)
	UpdateCategory(ctx context.Context, updateData map[string]interface{}, catId uint) (*Category, error)
	DeleteCategory(ctx context.Context, catId uint) error
}