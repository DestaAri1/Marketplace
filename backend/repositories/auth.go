// repository/auth_repository.go
package repository

import (
	"context"
	
	"github.com/DestaAri1/models"
	"gorm.io/gorm"
)

type AuthRepository struct {
	db *gorm.DB
}

func (r *AuthRepository) RegisterUser(ctx context.Context, registerData *models.AuthCredentials) (*models.User, error) {
	user := &models.User{
		Username: registerData.Username,
		Email:    registerData.Email,
		Password: registerData.Password,
	}

	res := r.db.Model(&models.User{}).Create(user)

	if res.Error != nil {
		return nil, res.Error
	}

	return user, nil
}

func (r *AuthRepository) GetUser(ctx context.Context, query interface{}, args ...interface{}) (*models.User, error) {
	// Find the user first
	user := &models.User{}
	if res := r.db.Where(query, args...).First(user); res.Error != nil {
		return nil, res.Error
	}

	// Get biodata separately
	var biodata models.Biodata
	result := r.db.Where("user_id = ?", user.Id).First(&biodata)
	
	// Create biodata response if found
	if result.Error == nil {
		user.Biodata = models.BiodataReponse{
			Birthday:    biodata.Birthday,
			PhoneNumber: biodata.PhoneNumber,
			Gender:      biodata.Gender,
			Image:       biodata.Image,
		}
	}

	return user, nil
}


func NewAuthRepository(db *gorm.DB) models.AuthRepository {
	return &AuthRepository{
		db: db,
	}
}