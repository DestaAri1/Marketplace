package db

import (
	"github.com/DestaAri1/models"
	"github.com/gofiber/fiber/v2/log"
	"golang.org/x/crypto/bcrypt"
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
    result := db.First(&adminUser, "email = ?", "admin@example.com")
    
    if result.RowsAffected == 0 {
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte("12345678"), bcrypt.DefaultCost)
		
		if err != nil {
			log.Fatalf("Failed to hash password: %v", err)
		}
		
		role := 0
        admin := &models.User{
            Username	: "Admin User",
            Email 		: "admin@gmail.com",
            Password 	: string(hashedPassword), // Remember to hash this password
			Role		: &role,
        }
        db.Create(&admin)
    }
}