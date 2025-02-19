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

func (r *SellerProductRepository) GetAllProduct(ctx context.Context, userId uint) ([]*models.ProductResponse, error) {
	products := []*models.ProductResponse{}

	res := r.db.
		Table("products").
		Select("products.id, products.name, products.stock, products.price, products.description, products.status, categories.name as category").
		Joins("LEFT JOIN categories ON categories.id = products.category_id").
		Where("products.user_id = ?", userId).
		Scan(&products)

	if res.Error != nil {
		return nil, res.Error
	}

	return products, nil
}

func (r *SellerProductRepository) GetOneProduct(ctx context.Context, productId uint, userId uint) (*models.ProductResponse, error) {
	product := &models.ProductResponse{}

	res := r.db.
		Table("products").
		Select("products.id, products.name, products.stock, products.price, products.description, products.status, categories.name as category").
		Joins("LEFT JOIN categories ON categories.id = products.category_id").
		Where("products.id = ?", productId).
		Where("products.user_id = ?", userId).
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
	category := &models.Category{}
	
	if cekData := r.db.Model(category).Where("id = ?", formData.Category).First(category).Error; cekData != nil {
		if errors.Is(cekData, gorm.ErrRecordNotFound) {
			return nil, errors.New("category not found")
		}
		return nil, cekData
	}

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

func (r *SellerProductRepository) UpdateProduct(ctx context.Context, updateData map[string]interface{}, productId, userId uint) (*models.Product, error) {
	product := &models.Product{}

	// Memulai transaksi
	tx := r.db.Begin()

	// Mencari produk berdasarkan id dan user_id
	if err := tx.Where("id = ? AND user_id = ?", productId, userId).First(product).Error; err != nil {
		tx.Rollback()
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("product not found")
		}
		return nil, err
	}

	// Melakukan update pada produk
	if err := tx.Model(product).Updates(updateData).Error; err != nil {
		tx.Rollback()
		return nil, err
	}

	tx.Commit()
	return product, nil
}

func (r *SellerProductRepository) DeleteProduct(ctx context.Context, productId uint, userId uint) error {
	product := &models.Product{}

	// Memulai transaksi
	tx := r.db.Begin()

	// Mencari produk berdasarkan id dan user_id
	if err := tx.Where("id = ? AND user_id = ?", productId, userId).First(product).Error; err != nil {
		tx.Rollback()
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return errors.New("product not found")
		}
		return err
	}

	// Melakukan update pada produk
	if err := tx.Delete(product).Error; err != nil {
		tx.Rollback()
		return err
	}

	tx.Commit()
	return nil
}

func NewSellerProductRepository(db *gorm.DB) models.SellerProductRepository {
	return &SellerProductRepository{
		db: db,
	}
}