package models

import "context"

type StatusPayment int

const (
	Unpayed StatusPayment = 0
	Payed   StatusPayment = 1
)

type Payment struct {
	Base
	Method         int    `json:"method" gorm:"not null"`
	VirtualAccount string `json:"virtual_account"`
	StatusPayment  int    `json:"status" gorm:"default:0"`
}

type FormCheckOut struct {
	
}

type PaymentRepository interface {
	CheckOut(ctx context.Context, )
}