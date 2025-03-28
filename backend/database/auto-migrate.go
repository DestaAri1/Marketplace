package db

import (
	"github.com/DestaAri1/models"
	"gorm.io/gorm"
)

func DBMigrator(db *gorm.DB) error {
	return db.AutoMigrate(
		&models.User{}, 
		&models.Seller_Request{}, 
		&models.Product{}, 
		&models.Category{}, 
		&models.Cart{}, 
		&models.Province{},
		&models.Regency{},
		&models.District{},
		&models.Village{},
		&models.Address{},
		&models.Biodata{},
	)
}