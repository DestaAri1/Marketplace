package models

import (
	"context"
	"mime/multipart"
	"time"
)

type Biodata struct {
	Base
	Birthday    *time.Time `json:"birthday,omitempty"`
	PhoneNumber string     `json:"phone_number,omitempty"`
	Gender      *int       `json:"gender,omitempty"`
	Image       string     `json:"image,omitempty"`
	UserId      uint       `json:"user_id"`
	User        User       `json:"user" gorm:"foreignKey:UserId;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}

type BiodataReponse struct {
	Birthday    *time.Time `json:"birthday"`
	PhoneNumber string     `json:"phone_number"`
	Gender      *int       `json:"gender"`
	Image       string     `json:"image"`
}

type FormBiodata struct {
	Username	string				  `json:"username" validate:"required"`
	Birthday    *time.Time            `json:"birthday" validate:"required"` // Format YYYY-MM-DD
	PhoneNumber string                `json:"phone_number" validate:"required,min=10,max=15"` // Hanya angka, min 10 digit, max 15 digit
	Gender      *int                  `json:"gender" validate:"required,oneof=1 2"` // Hanya boleh 1 (Laki-laki) atau 2 (Perempuan)
	Image       *multipart.FileHeader `json:"image" form:"image"` // Validasi file gambar
	ImagePath   string                `json:"-"` // Internal field to store the image path
}

type BiodataRepository interface {
	UpdateBiodata(ctx context.Context, formData *FormBiodata, biodataId uint, userId uint) error
}
