package repository

import (
	"context"

	"github.com/DestaAri1/models"
	"gorm.io/gorm"
)

type AdminUserRepository struct {
	db *gorm.DB
}

func (r *AdminUserRepository) GetAllUser(ctx context.Context) ([]*models.AllUserResponse, error) {
	user := []*models.AllUserResponse{}

	res := r.db.
		Table("users").
		Select("id", "username", "email", "role").
		Scan(&user)

	if res.Error != nil {
		return nil, res.Error
	}
	return user, nil
}

func (r *AdminUserRepository) UpgradeUser(ctx context.Context, formRequest *models.FormRequestUpgradeUser, userId uint)(*models.User, error) {
	return nil, nil
}

func NewAdminUserRepository(db *gorm.DB) models.AdminUserRepository{
	return &AdminUserRepository{
		db: db,
	}
}