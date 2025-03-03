package repository

import (
	"context"

	"github.com/DestaAri1/models"
	"github.com/DestaAri1/utils"
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
	// Handle ID-based queries untuk cache
	if id, ok := extractUserID(query, args...); ok {
		if user, exists := utils.GlobalUserCache.GetUser(id); exists {
			return user, nil
		}
	}

	user := &models.User{}
	if res := r.db.Model(&models.User{}).Where(query, args...).First(user); res.Error != nil {
		return nil, res.Error
	}

	// Cache the result if it's an ID-based query
	if id, ok := extractUserID(query, args...); ok {
		utils.GlobalUserCache.SetUser(id, user)
	}

	return user, nil
}

// extractUserID tries to extract user ID from various query formats
func extractUserID(query interface{}, args ...interface{}) (uint, bool) {
	// Handle direct ID query
	if id, ok := query.(uint); ok {
		return id, true
	}

	// Handle string query "id = ?"
	if queryStr, ok := query.(string); ok {
		if queryStr == "id = ?" && len(args) > 0 {
			// Try to convert the first argument to uint
			switch v := args[0].(type) {
			case uint:
				return v, true
			case int:
				return uint(v), true
			case float64:
				return uint(v), true
			}
		}
	}

	return 0, false
}

func NewAuthRepository(db *gorm.DB) models.AuthRepository {
	return &AuthRepository{
		db: db,
	}
}