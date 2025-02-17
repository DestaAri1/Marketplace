package repository

import (
	"context"
	"errors"

	"github.com/DestaAri1/models"
	"gorm.io/gorm"
)

type CategoryRepository struct {
	db *gorm.DB
}

func (r *CategoryRepository) GetAllCategory(ctx context.Context) ([]*models.CategoryResponse, error) {
	return nil, nil
}

func (r *CategoryRepository) CreateCategory(ctx context.Context, formData *models.FormCategory) (*models.Category, error) {
	category := &models.Category{
		Name: formData.Name,
	}

	tx := r.db.Begin()

	// Cek apakah kategori sudah ada
	var existingCategory models.Category
	if err := tx.Where("name = ?", formData.Name).First(&existingCategory).Error; err == nil {
		tx.Rollback()
		return nil, errors.New("category already exists")
	} else if !errors.Is(err, gorm.ErrRecordNotFound) {
		// Jika error bukan karena record tidak ditemukan, rollback dan return error
		tx.Rollback()
		return nil, err
	}

	// Simpan kategori baru
	if err := tx.Create(category).Error; err != nil {
		tx.Rollback()
		return nil, err
	}

	tx.Commit()
	return category, nil
}

func (r *CategoryRepository) UpdateCategory(ctx context.Context, updateData map[string]interface{}, catId uint) (*models.Category, error) {
	return nil, nil
}

func (r *CategoryRepository) DeleteCategory(ctx context.Context, catId uint) error {
	return nil
}

func NewCategoryRepository(db *gorm.DB) models.CategoryRepository {
	return &CategoryRepository{
		db: db,
	}
}