package db

import (
	// "github.com/DestaAri1/models"
	"github.com/DestaAri1/models"
	"github.com/gofiber/fiber/v2/log"
	"golang.org/x/crypto/bcrypt"

	// "golang.org/x/crypto/bcrypt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

func Init(DBMigrator func(db *gorm.DB) error) *gorm.DB {

	db, err := gorm.Open(mysql.Open("root:@/golang?charset=utf8mb4&parseTime=True&loc=Local"), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})

	if err != nil {
		log.Fatal("Unable to connect DBL %e", err)
	}

	log.Info("Success connect DB")

	if err := DBMigrator(db); err != nil {
		log.Fatal("Unable to migrate table %e", err)
	}
	seedData(db)

	return db
}

func seedData(db *gorm.DB) {
	var adminUser models.User
    result := db.First(&adminUser, "email = ?", "admin@gmail.com")
    
    if result.RowsAffected == 0 {
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte("12345678"), bcrypt.DefaultCost)
		
		if err != nil {
			log.Fatalf("Failed to hash password: %v", err)
		}
		
		var role models.UserRole
        admin := &models.User{
            Username	: "Admin User",
            Email 		: "admin@gmail.com",
            Password 	: string(hashedPassword), // Remember to hash this password
			Role		: &role,
        }
        db.Create(&admin)
    }

	var category models.Category
	result2 := db.First(&category, "name = ?", "Technology")
	if result2.RowsAffected == 0 {
        category := &models.Category{
			Name: "Technology",
        }
        db.Create(&category)
    }

	var product models.Product
	result3 := db.First(&product, "name = ?", "Leovo Thickpad")
	if result3.RowsAffected == 0 {
        product := &models.Product{
			Name: "Leovo Thickpad",
			Stock: 10,
			Price: 99.99,
			CategoryId: 1,
			UserId: 4,
			Status: true,
        }
        db.Create(&product)
    }
}