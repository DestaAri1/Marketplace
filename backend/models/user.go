package models

import (
	"context"
)

type UserRole int

const (
	Admin 		UserRole = 0
	Seller 		UserRole = 1
	UserNormal  UserRole = 2
)

type User struct {
	Base
	Username	string 		`json:"username" gorm:"text;not null"`
	Email		string		`json:"email" gorm:"text;not null"`
	Role      	*UserRole 	`json:"role" gorm:"type:int;default:2;not null"`
	Password 	string  	`json:"-"` //Do not compute the password in json
}

type Seller_Request struct {
	Base
	UserID		int		`json:"user_id"`
	Status		bool	`json:"status" gorm:"default:false"`
	Reason		string	`json:"reason" gorm:"type:text"`
	User		User	`json:"user" gorm:"foreignkey:UserID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}

type SellerRequestRepository interface {
	SellerRequest(ctx context.Context, requestData *Seller_Request, userId uint) (*Seller_Request, error)
	GetStatusRequest(ctx context.Context, query interface{}, args ...interface{}) (*Seller_Request, error)
}