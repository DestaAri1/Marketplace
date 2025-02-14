package repository

import (
	"context"
	"errors"

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
	user := &models.User{}
	userRole := formRequest.Role

	checkingData := r.db.Where("id = ?", userId).First(&user)

	if checkingData.Error != nil { // Jika sudah ada, kembalikan error
		if errors.Is(checkingData.Error, gorm.ErrRecordNotFound) {
			return nil, errors.New("user not found")
		}
		return nil, checkingData.Error
	}

	res := r.db.Model(user).Where("id = ?", userId).Update("role", userRole)

	if res.Error != nil {
		return nil, res.Error
	}
	
	return user, nil
}

func (r *AdminUserRepository) DeleteUserByAdmin(ctx context.Context, formData *models.FormRequestDeleteUserByAdmin, userId uint) (*models.User, error) {
	user := &models.User{}
	data := formData.UserId

	// Memulai transaksi
	tx := r.db.Begin()

	// Cek apakah user ada
	if err := tx.Where("id = ?", data).First(user).Error; err != nil {
		tx.Rollback()
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("user not found")
		}
		return nil, err
	}

	// Hapus user berdasarkan ID
	if err := tx.Delete(&user).Error; err != nil {
		tx.Rollback()
		return nil, err
	}

	// Commit transaksi jika berhasil
	tx.Commit()

	return user, nil
}

func NewAdminUserRepository(db *gorm.DB) models.AdminUserRepository{
	return &AdminUserRepository{
		db: db,
	}
}