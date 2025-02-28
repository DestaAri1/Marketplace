package repository

import (
	"context"
	"errors"

	"github.com/DestaAri1/models"
	"gorm.io/gorm"
)

type UserProductRepository struct {
	db *gorm.DB
}

func (r *UserProductRepository) UserGetAllProduct(ctx context.Context) ([]*models.UserProductResponse, error) {
	products := []*models.UserProductResponse{}

	res := r.db.
		Table("products").
		Select("products.id, products.name as product, products.stock, products.price, products.description, " +
			"categories.name as category, users.username as seller").
		Joins("LEFT JOIN users ON users.id = products.user_id").
		Joins("LEFT JOIN categories ON categories.id = products.category_id").
		Where("products.status = 1").
		Scan(&products)

	if res.Error != nil {
		return nil, res.Error
	}

	return products, nil
}

func(r *UserProductRepository) GetOneProduct(ctx context.Context, productId uint) (*models.UserProductResponse, error) {
	products := &models.UserProductResponse{}

	res := r.db.
		Table("products").
		Select("products.id, products.name as product, products.stock, products.price, products.description, " +
			"categories.name as category, users.username as seller").
		Joins("LEFT JOIN users ON users.id = products.user_id").
		Joins("LEFT JOIN categories ON categories.id = products.category_id").
		Where("products.status = 1").
		Where("products.id = ?", productId).
		Scan(&products)

	if res.Error != nil {
		return nil, res.Error
	}

	if res.RowsAffected == 0 {
		return nil, errors.New("product not found")
	}

	return products, nil
}

func NewUserProductRepository(db *gorm.DB) models.UserProductRepository{
	return &UserProductRepository{
		db: db,
	}
}