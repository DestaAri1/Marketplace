package repository

import (
	"context"
	"errors"

	"github.com/DestaAri1/models"
	"gorm.io/gorm"
)

type SellerProductRepository struct {
	db *gorm.DB
}

func (r *SellerProductRepository) GetAllProduct(ctx context.Context) ([]*models.ProductResponse, error) {
	product := []*models.ProductResponse{}

	res := r.db.
		Table("products").
		Select("id", "name", "stock", "price", "description").
		Scan(&product)

	if res.Error != nil {
		return nil, res.Error
	}

	return product, nil
}

func (r *SellerProductRepository) GetOneProduct(ctx context.Context, productId uint, userId uint) (*models.ProductResponse, error) {
	product := &models.ProductResponse{}

	res := r.db.
		Table("products").
		Select("id", "name", "stock", "price", "description").
		Where("id = ?", productId).
		Where("user_id = ?", userId).
		Scan(&product)

	if res.Error != nil {
		return nil, res.Error
	}

	// Jika tidak ada data yang ditemukan
	if res.RowsAffected == 0 {
		return nil, errors.New("product not found")
	}

	return product, nil
}

func (r *SellerProductRepository) CreateOneProduct(ctx context.Context, formData *models.FormCreateProduct, userId uint) (*models.Product, error) {
	product := &models.Product{}
	data := &models.Product{
		Name: formData.Name,
		Stock: *formData.Stock,
		Price: *formData.Price,
		UserId: userId,
		Description: formData.Description,
	}

	res := r.db.Model(product).Create(data)

	if res.Error != nil {
		return nil, res.Error
	}
	return product, nil
}

func (r *SellerProductRepository) UpdateProduct(ctx context.Context, updateData map[string]interface{}, productId uint) (*models.Product, error) {
	return nil, nil
}

func (r *SellerProductRepository) DeleteProduct(ctx context.Context, productId uint) error {
	return nil
}

func NewSellerProductRepository(db *gorm.DB) models.SellerProductRepository {
	return &SellerProductRepository{
		db: db,
	}
}