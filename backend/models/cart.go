package models

import (
	"context"
)

type Status int 

const (
	InCart		Status = 0
	NeedToPay	Status = 1
	Payed		Status = 2
	Delivered	Status = 3
)

type Cart struct {
	Base
	UserId     uint    `json:"user_id"`
	User       User    `json:"user" gorm:"foreignKey:UserId;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	ProductID  uint    `json:"product_id"`
	Product    Product `json:"product" gorm:"foreignKey:ProductID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	Quantity   int     `json:"quantity"`
	Status	   int	   `json:"status" gorm:"default:0"`
}

type FormCreateCart struct {
	ProductID uint `json:"product_id" validate:"required,numeric,gt=0"`
	Quantity  int  `json:"quantity" validate:"required,numeric,min=1"`
}

type CartRepository interface {
	GetCart(ctx context.Context, userId uint) ([]*CartResponse, error)
	CreateCart(ctx context.Context, cart *FormCreateCart, userId uint) error
	// UpdateCart(ctx context.Context, cartID uint, cart *Cart) error
	DeleteCart(ctx context.Context, cartID uint, userId uint) error
}

type CartResponse struct {
	ID         		uint    `json:"id"`
	ProductId		uint	`json:"product_id"`
	ProductName  	string  `json:"product_name"`
	Quantity   		int     `json:"quantity"`
	ProductPrice	float64 `json:"product_price"`
	TotalPrice 		float64 `json:"total_price"`
}

