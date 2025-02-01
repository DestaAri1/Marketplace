package repository

import (
	"context"

	"github.com/DestaAri1/models"
	"gorm.io/gorm"
)

type SellerRepository struct {
	db *gorm.DB
}

func (r *SellerRepository) SellerRequest(ctx context.Context, requestData *models.Seller_Request, userId uint) (*models.Seller_Request, error) {
	requestData.UserID = int(userId)
	
	res := r.db.Create(requestData)
	if res.Error != nil {
		return nil, res.Error
	}
	return requestData, nil
}

func NewSellerRepository(db *gorm.DB) models.SellerRequestRepository{
	return &SellerRepository{
		db: db,
	}
}