package models

import (
	"context"
)

type Status int 

const (
	InCart		Status = 0
	NeedToPay	Status = 1
	Unprocess	Status = 2
	Preparing	Status = 3
	Delivered	Status = 4
	Recived		Status = 5
)

type Cart struct {
	Base
	UserId     uint    `json:"user_id" gorm:"not null"`
	User       User    `json:"user" gorm:"foreignKey:UserId;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	ProductID  uint    `json:"product_id" gorm:"not null"`
	Product    Product `json:"product" gorm:"foreignKey:ProductID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	Quantity   int     `json:"quantity" gorm:"not null"`
	Status	   int	   `json:"status" gorm:"default:0"`
	PaymentId  uint	   `json:"payment_id"`
	Payment	   Payment `json:"payment" gorm:"foreignKey:PaymentId;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
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

