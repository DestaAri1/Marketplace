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
	users := []models.User{
		{
			Username: "Admin User",
			Email:    "admin@gmail.com",
			Password: hashPassword("12345678"),
			Role: getRolePointer(models.Admin),
		},
		{
			Username: "John Doe",
			Email:    "safety_kso@gmail.com",
			Password: hashPassword("12345678"),
			Role: getRolePointer(models.Seller),
		},
		{
			Username: "Jane Doe",
			Email:    "destaari@gmail.com",
			Password: hashPassword("12345678"),
		},
	}

	// Looping untuk menambahkan data user
	for _, user := range users {
		var existingUser models.User
		result := db.First(&existingUser, "email = ?", user.Email)

		if result.RowsAffected == 0 {
			db.Create(&user)
		}
	}

	log.Info("Seeding users completed!")

	// Seed kategori
	var category models.Category
	result := db.First(&category, "name = ?", "Technology")
	if result.RowsAffected == 0 {
		db.Create(&models.Category{Name: "Technology"})
	}

	// Seed produk
	products := []models.Product{
		{
			Name:       "Leovo Thickpad",
			Stock:      10,
			Price:      99.99,
			CategoryId: 1,
			UserId:     2, // Pastikan user dengan ID ini sudah ada
			Status:     false,
		},
		{
			Name:       "Leovo Thickpad 2",
			Stock:      10,
			Price:      99.99,
			CategoryId: 1,
			UserId:     2, // Pastikan user dengan ID ini sudah ada
			Status:     true,
		},
	}
	// Looping untuk menambahkan data user
	for _, product := range products {
		var existingUser models.Product
		result := db.First(&existingUser, "name = ?", product.Name)

		if result.RowsAffected == 0 {
			db.Create(&product)
		}
	}

	log.Info("Seeding users completed!")
}

// Fungsi untuk hash password
func hashPassword(password string) string {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		log.Fatalf("Failed to hash password: %v", err)
	}
	return string(hashedPassword)
}

func getRolePointer(role models.UserRole) *models.UserRole {
	return &role
}
