package models

import "context"

type Product struct {
	Base
	Name        string   `json:"name" gorm:"type:varchar(255);not null"`
	Stock       int      `json:"stock" gorm:"not null"`
	Price       float64  `json:"price" gorm:"type:decimal(10,2);not null"`
	CategoryId  uint     `json:"category_id"`
	Category    Category `json:"category" gorm:"foreignKey:CategoryId;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	UserId      uint     `json:"user_id"`
	User        User     `json:"user" gorm:"foreignKey:UserId;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	Status      bool     `json:"status,omitempty" gorm:"default:0"`
	Description string   `json:"description,omitempty" gorm:"type:text"`
}

type ProductResponse struct {
	Id          uint    `json:"id"`
	Name        string  `json:"name"`
	Stock       int     `json:"stock"`
	Price       float64 `json:"price"`
	CategoryId  uint    `json:"category_id"`
	Category    string  `json:"category"`
	Status      bool    `json:"status"`
	Description string  `json:"description"`
}

type FormCreateProduct struct {
	Name        string   `json:"name" validate:"required,min=3,max=100"`     // Minimal 3 karakter, maksimal 100
	Stock       *int     `json:"stock" validate:"required,numeric,min=1"`    // Minimal stok 1
	Price       *float64 `json:"price" validate:"required,numeric,gt=0"`     // Harga wajib diisi dan harus lebih dari 0
	Status		*bool	 `json:"status" validate:"omitempty"`
	Category	*int	 `json:"category_id" validate:"required,numeric,gt=0"`
	Description string   `json:"description" validate:"omitempty,max=500"`   // Opsional, maksimal 500 karakter
}

type FormStatusProduct struct {
	Status		*bool	 `json:"status" validate:"required"`
}

type SellerProductRepository interface {
	GetAllProduct(ctx context.Context, userId uint) ([]*ProductResponse, error)
	GetOneProduct(ctx context.Context, productId uint, userId uint) (*ProductResponse, error)
	CreateOneProduct(ctx context.Context, formData *FormCreateProduct, userId uint) (*Product, error)
	UpdateProduct(ctx context.Context, updateData map[string]interface{}, productId uint, userId uint) (*Product, error)
	DeleteProduct(ctx context.Context, productId uint, userId uint) error
}

type UserProductResponse struct {
	Id          uint    `json:"id"`
	Product     string  `json:"product"`
	Seller		string	`json:"seller"`
	Stock       int     `json:"stock"`
	Price       float64 `json:"price"`
	Category    string  `json:"category"`
	Description string  `json:"description"`
}

type UserProductRepository interface{
	UserGetAllProduct(ctx context.Context) ([]*UserProductResponse, error)
	GetOneProduct(ctx context.Context, productId uint) (*UserProductResponse, error)
}