package repository

import (
	"context"
	"errors"

	"github.com/DestaAri1/models"
	"gorm.io/gorm"
)

type SellerRepository struct {
	db *gorm.DB
}

func (r *SellerRepository) SellerRequest(ctx context.Context, requestData *models.Seller_Request, userId uint) (*models.Seller_Request, error) {
	requestData.UserID = int(userId)

	var existingRequest models.Seller_Request
	checkingData := r.db.Where("status = ? AND user_id = ?", 0,userId).
		First(&existingRequest)

	if checkingData.Error == nil { // Jika ditemukan request dengan status 0, kembalikan error
		return nil, errors.New("seller request already exists")
	} else if !errors.Is(checkingData.Error, gorm.ErrRecordNotFound) { // Jika error selain data tidak ditemukan, kembalikan error
		return nil, checkingData.Error
	}
	
	res := r.db.Create(requestData)
	if res.Error != nil {
		return nil, res.Error
	}
	return requestData, nil
}

func (r *SellerRepository) GetStatusRequest(ctx context.Context, query interface{}, args ...interface{}) (*models.Seller_Request, error) {
	sellerRequest := &models.Seller_Request{}

	if res := r.db.Model(&models.Seller_Request{}).Where(query, args).Where("status = ?", 0).First(sellerRequest); res.Error != nil {
		return nil, res.Error
	}
	return sellerRequest, nil
}

func NewSellerRepository(db *gorm.DB) models.SellerRequestRepository{
	return &SellerRepository{
		db: db,
	}
}