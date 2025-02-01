package models

import (
	"context"
)

type User struct {
	Base
	Username	string 	`json:"username" gorm:"text;not null"`
	Email		string	`json:"email" gorm:"text;not null"`
	Role      	*int 	`json:"role" gorm:"type:int;default:2;not null"`
	Password 	string  `json:"-"` //Do not compute the password in json
}

type Seller_Request struct {
	Base
	UserID		int		`json:"user_id"`
	User		User	`json:"user" gorm:"foreignkey:UserID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}

type SellerRequestRepository interface {
	SellerRequest(ctx context.Context, requestData *Seller_Request, userId uint) (*Seller_Request, error)
}