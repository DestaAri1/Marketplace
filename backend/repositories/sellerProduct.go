package repository

import (
	"context"
	"errors"
	"fmt"
	"path/filepath"

	"github.com/DestaAri1/models"
	"github.com/DestaAri1/utils"
	"gorm.io/gorm"
)

type SellerProductRepository struct {
	db *gorm.DB
}

func (r *SellerProductRepository) GetAllProduct(ctx context.Context, userId uint) ([]*models.ProductResponse, error) {
	products := []*models.ProductResponse{}

	res := r.db.
		Table("products").
		Select("products.id, products.name, products.image, products.stock, products.price, products.description," + 
			   "products.status, categories.id as category_id, categories.name as category").
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
		Select("products.id, products.name, products.stock, products.price, products.description, products.status, categories.id as category_id, categories.name as category").
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
	
	// Validate category
	if formData.Category != nil {
		if cekData := r.db.Model(category).Where("id = ?", formData.Category).First(category).Error; cekData != nil {
			if errors.Is(cekData, gorm.ErrRecordNotFound) {
				return nil, errors.New("category not found")
			}
			return nil, cekData
		}
	}

	// Prepare product data
	data := &models.Product{
		Name:        formData.Name,
		UserId:      userId,
		Description: formData.Description,
	}

	// Add optional fields
	if formData.Stock != nil {
		data.Stock = *formData.Stock
	}
	if formData.Price != nil {
		data.Price = *formData.Price
	}
	if formData.Category != nil {
		data.CategoryId = uint(*formData.Category)
	}
	if formData.Status != nil {
		data.Status = *formData.Status
	}

	// Handle image upload
	if formData.ImageFile != nil {
		// Open the uploaded file
		file, err := formData.ImageFile.Open()
		if err != nil {
			return nil, fmt.Errorf("error opening image file: %w", err)
		}
		defer file.Close()

		// Generate unique filename and save
		imagePath, err := utils.SaveProfilePicture(formData.ImageFile, "assets/products")
		if err != nil {
			// Fallback to optimized image if SVG fails
			imagePath, err = utils.SaveOptimizedImage(formData.ImageFile, "assets/products")
			if err != nil {
				return nil, fmt.Errorf("error processing image: %w", err)
			}
		}
		
		// Set image path
		data.Image = imagePath
	}

	// Create product in database
	res := r.db.Model(product).Create(data)
	if res.Error != nil {
		return nil, res.Error
	}

	return data, nil
}

func (r *SellerProductRepository) UpdateProduct(ctx context.Context, updateData *models.FormCreateProduct, productId, userId uint) (*models.Product, error) {
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

	// Create a map to store updates
	updates := make(map[string]interface{})

	// Add non-nil fields to updates
	if updateData.Name != "" {
		updates["name"] = updateData.Name
	}
	if updateData.Stock != nil {
		updates["stock"] = *updateData.Stock
	}
	if updateData.Price != nil {
		updates["price"] = *updateData.Price
	}
	if updateData.Category != nil {
		updates["category_id"] = *updateData.Category
	}
	if updateData.Description != "" {
		updates["description"] = updateData.Description
	}
	if updateData.Status != nil {
		updates["status"] = *updateData.Status
	}

	// Handle image upload
	if updateData.ImageFile != nil {
		// Try to save as SVG first (now returns just the filename)
		imagePath, err := utils.SaveProfilePicture(updateData.ImageFile, "assets/products")
		if err != nil {
			// If SVG conversion fails, fall back to optimized JPG
			imagePath, err = utils.SaveOptimizedImage(updateData.ImageFile, "assets/products")
			if err != nil {
				tx.Rollback()
				return nil, fmt.Errorf("error processing image: %w", err)
			}
		}
		
		// Delete old image if exists
		if product.Image != "" {
			oldImagePath := filepath.Join("assets/products", product.Image)
			if err := utils.DeleteProfilePicture(oldImagePath); err != nil {
				fmt.Printf("Warning: failed to delete old image: %v\n", err)
			}
		}
		
		// Add image filename to updates
		updates["image"] = imagePath
	}

	// Melakukan update pada produk
	if err := tx.Model(product).Updates(updates).Error; err != nil {
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