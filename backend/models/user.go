package models

import (
	"context"

	"gorm.io/gorm"
)

type UserRole int

const (
	Admin 		UserRole = 0
	Seller 		UserRole = 1
	UserNormal  UserRole = 2
)

type User struct {
	Base
	Username	string 			`json:"username" gorm:"text;not null"`
	Email		string			`json:"email" gorm:"text;not null"`
	Role      	*UserRole 		`json:"role" gorm:"type:int;default:2;not null"`
	Password 	string  		`json:"-"` //Do not compute the password in json
	Biodata     BiodataReponse  `json:"biodata,omitempty" gorm:"-"`
}

type Seller_Request struct {
	Base
	UserID		int		`json:"user_id"`
	Status		int		`json:"status" gorm:"default:0"`
	Reason		string	`json:"reason" gorm:"type:text"`
	User		User	`json:"user" gorm:"foreignkey:UserID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}

type SellerRequestRepository interface {
	SellerRequest(ctx context.Context, requestData *Seller_Request, userId uint) (*Seller_Request, error)
	GetStatusRequest(ctx context.Context, query interface{}, args ...interface{}) (*Seller_Request, error)
}

func (u *User) AfterCreate(tx *gorm.DB) (err error) {
	biodata := Biodata{
		UserId:      u.Id,
	}

	// Insert biodata ke dalam database
	if err := tx.Create(&biodata).Error; err != nil {
		return err
	}

	return nil
}