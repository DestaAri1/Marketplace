package repository

import (
	"github.com/DestaAri1/models"
	"gorm.io/gorm"
)

type BaseRepository struct {
	db *gorm.DB
}

func (b *BaseRepository) IsValidID(tableName string, id string) bool {
    if b.db == nil {
        // Log this issue and handle gracefully
        return false
    }
    
    // Check if id is empty
    if id == "" {
        return false
    }
    
    var count int64
    result := b.db.Table(tableName).Where("id = ?", id).Count(&count)
    
    // Handle database errors gracefully
    if result.Error != nil {
        // Log the error here - don't panic
        return false
    }
    
    return count > 0
}

func NewBaseRepository(db *gorm.DB) models.BaseRepository {
	return &BaseRepository{
		db: db,
	}
}