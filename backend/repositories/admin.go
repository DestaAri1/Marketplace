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
    // var requests []models.SellerRequestResponse

    // Debugging: Gunakan query mentah untuk melihat apa yang terjadi
    // rows, err := r.db.Raw(`
    //     SELECT 
    //         seller_requests.id, 
    //         seller_requests.user_id, 
    //         seller_requests.status, 
    //         seller_requests.created_at, 
    //         seller_requests.updated_at,
    //         users.username, 
    //         users.email
    //     FROM 
    //         seller_requests 
    //     JOIN 
    //         users ON users.id = seller_requests.user_id
    //     WHERE 
    //         seller_requests.status = ?`, false).Rows()

    // if err != nil {
    //     return nil, fmt.Errorf("error in raw query: %v", err)
    // }
    // defer rows.Close()

    // // Manual scanning
    // for rows.Next() {
    //     var request models.Seller_Request
    //     var user models.User

    //     err := rows.Scan(
    //         &request.Id, 
    //         &request.UserID, 
    //         &request.Status, 
    //         &request.CreatedAt, 
    //         &request.UpdatedAt,
    //         &user.Username,
    //         &user.Email,
    //     )

    //     if err != nil {
    //         return nil, fmt.Errorf("error scanning row: %v", err)
    //     }

    //     request.User = user
    //     requests = append(requests, &request)
    // }

    // // Logging untuk debugging
    // log.Printf("Found %d seller requests", len(requests))

    // if len(requests) == 0 {
    //     return nil, fmt.Errorf("no seller requests found")
    // }

    var requests []*models.SellerRequestResponse

    result := r.db.
        Table("seller_requests").
        Select("seller_requests.user_id", 
                "users.username", 
                "users.email", 
                "seller_requests.status").
        Joins("JOIN users ON users.id = seller_requests.user_id").
        Where("seller_requests.status = ?", false).
        Scan(&requests)

    if result.Error != nil {
        return nil, result.Error
    }

    return requests, nil
}

func (r *AdminRepository) AcceptRequest(ctx context.Context, userId uint) (*models.User, error) {
	user := &models.User{}
	requestSeller := &models.Seller_Request{}

	sellerRole:=1
	res := r.db.Model(user).Where("id = ?", userId).Update("role", sellerRole)

	if res.Error != nil {
		return nil, res.Error
	}
	
	res2 := r.db.Model(requestSeller).Where("user_id = ?", userId).Update("status", true)
	
	if res2.Error != nil {
		return nil, res2.Error
	}
	return user, nil
}

func NewAdminRepository(db *gorm.DB) models.AdminRepository{
	return &AdminRepository{
		db: db,
	}
}