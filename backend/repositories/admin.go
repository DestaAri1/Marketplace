package repository

import (
	"context"

	"github.com/DestaAri1/models"
	"gorm.io/gorm"
)

type AdminRepository struct {
	db *gorm.DB
}

func (r *AdminRepository) GetAllRequest(ctx context.Context) ([]*models.SellerRequestResponse, error) {
    var requests []*models.SellerRequestResponse

    result := r.db.
        Table("seller_requests").
        Select("seller_requests.user_id", 
                "users.username", 
                "users.email", 
                "seller_requests.status",
				"seller_requests.reason").
        Joins("JOIN users ON users.id = seller_requests.user_id").
        Scan(&requests)

    if result.Error != nil {
        return nil, result.Error
    }

    return requests, nil
}

func (r *AdminRepository) AcceptRequest(ctx context.Context, requestData *models.FormRequestSeller , userId uint) (*models.User, error) {
	user := &models.User{}
	requestSeller := &models.Seller_Request{}

	if requestData.Status == 2 {
		sellerRole := 1
		res := r.db.Model(user).Where("id = ?", userId).Update("role", sellerRole)
	
		if res.Error != nil {
			return nil, res.Error
		}
		
		res2 := r.db.Model(requestSeller).Where("user_id = ?", userId).Update("status", 2)
		
		if res2.Error != nil {
			return nil, res2.Error
		}
	} else {
		res := r.db.Model(requestSeller).Where("user_id = ?", userId).Update("status", 1)

		if res.Error != nil {
			return nil, res.Error
		}
	}

	return user, nil
}

func NewAdminRepository(db *gorm.DB) models.AdminRepository{
	return &AdminRepository{
		db: db,
	}
}