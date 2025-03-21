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

type BiodataRepository struct {
	db *gorm.DB
}

func (r *BiodataRepository) UpdateBiodata(ctx context.Context, formData *models.FormBiodata, biodataId uint, userId uint) error {
	// Start transaction
	tx := r.db.Begin()

	// Find existing biodata
	biodata := &models.Biodata{}
	if result := tx.Where("id = ? AND user_id = ?", biodataId, userId).First(biodata); result.Error != nil {
		tx.Rollback()
		if result.RowsAffected == 0 {
			return errors.New("No data found")
		}
		return result.Error
	}

	// Update username
	if err := tx.Model(&models.User{}).Where("id = ?", userId).Update("username", formData.Username).Error; err != nil {
		tx.Rollback()
		return err
	}

	// Prepare update data
	updates := map[string]interface{}{
		"birthday":     formData.Birthday,
		"phone_number": formData.PhoneNumber,
		"gender":       formData.Gender,
	}
	
	// Handle image if provided
	if formData.Image != nil {
		// Try to save as SVG first (now returns just the filename)
		imagePath, err := utils.SaveProfilePicture(formData.Image)
		if err != nil {
			// If SVG conversion fails, fall back to optimized JPG
			imagePath, err = utils.SaveOptimizedImage(formData.Image)
			if err != nil {
				tx.Rollback()
				return fmt.Errorf("error processing image: %w", err)
			}
		}
		
		// Delete old image if exists
		if biodata.Image != "" {
			oldImagePath := filepath.Join(utils.ProfilePictureDir, biodata.Image)
			if err := utils.DeleteProfilePicture(oldImagePath); err != nil {
				fmt.Printf("Warning: failed to delete old image: %v\n", err)
			}
		}
		
		// Add image filename to updates
		updates["image"] = imagePath
	}

	// Update biodata
	if err := tx.Model(&models.Biodata{}).Where("id = ?", biodataId).Updates(updates).Error; err != nil {
		tx.Rollback()
		return err
	}

	// Commit transaction
	return tx.Commit().Error
}

func NewBiodataRepository(db *gorm.DB) *BiodataRepository {
	return &BiodataRepository{
		db: db,
	}
}