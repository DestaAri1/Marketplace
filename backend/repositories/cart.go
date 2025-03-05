package repository

import (
	"context"
	"errors"

	"github.com/DestaAri1/models"
	"gorm.io/gorm"
)

type CartRepository struct {
	db *gorm.DB
}

func (r *CartRepository) CreateCart(ctx context.Context, cart *models.FormCreateCart, userId uint) error {
	tx := r.db.Begin()
	if tx.Error != nil {
		return tx.Error
	}

	// Check if product exists and has enough stock
	var product models.Product
	checkUser := tx.Where("id = ? AND user_id = ?", cart.ProductID, userId).First(&product)
	if checkUser.Error == nil {
		tx.Rollback()
		return errors.New("you cannot add your own product")
	}
	
	res := tx.Where("id = ? AND status = ?", cart.ProductID, 1).First(&product)
	if res.Error != nil {
		if res.Error == gorm.ErrRecordNotFound {
			tx.Rollback()
			return errors.New("no product found")
		}
		tx.Rollback()
		return res.Error
	}

	if product.Stock < cart.Quantity {
		tx.Rollback()
		return errors.New("insufficient stock")
	}

	// Create new cart entry
	newCart := &models.Cart{
		UserId		: userId,
		ProductID	: cart.ProductID,
		Quantity	: cart.Quantity,
	}

	if err := tx.Create(newCart).Error; err != nil {
		tx.Rollback()
		return err
	}

	tx.Commit()
	return nil
}

func (r *CartRepository) GetCart(ctx context.Context, userId uint) ([]*models.CartResponse, error) {
	cart := []*models.CartResponse{}

	res := r.db.
		Table("carts").
		Select("carts.id as id, products.id as product_id, products.name as product_name, carts.quantity, products.price as product_price, carts.quantity * products.price as total_price").
		Joins("LEFT JOIN products ON products.id = carts.product_id").
		Where("carts.user_id = ?", userId).
		Scan(&cart)

	if res.Error != nil {
		return nil, res.Error
	}

	return cart, nil
}

func (r *CartRepository) DeleteCart(ctx context.Context, cartId uint, userId uint) error {
	cart := &models.Cart{}

	tx := r.db.Begin()

	find := tx.Where("id = ? AND user_id = ?", cartId, userId).First(cart)

	if find.Error != nil {
		if find.Error == gorm.ErrRecordNotFound {
			tx.Rollback()
			return errors.New("cart not found")
		}
		tx.Rollback()
		return find.Error
	}

	if err := tx.Delete(cart).Error; err != nil {
		tx.Rollback()
		return err
	}

	tx.Commit()

	return nil
}

func NewCartRepository(db *gorm.DB) *CartRepository {
	return &CartRepository{
		db: db,
	}
}
