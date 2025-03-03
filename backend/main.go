package main

import (
	db "github.com/DestaAri1/database"
	"github.com/DestaAri1/handlers"
	"github.com/DestaAri1/middlewares"
	"github.com/DestaAri1/models"
	repository "github.com/DestaAri1/repositories"
	services "github.com/DestaAri1/sevices"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"gorm.io/gorm"
)

// App configuration
func setupApp() *fiber.App {
	app := fiber.New(fiber.Config{
		AppName:      "TicketBooking",
		ServerHeader: "Fiber",
	})

	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:5001",
		AllowMethods: "GET, POST, PUT, PATCH, DELETE, OPTIONS",
	}))

	return app
}

// Repository initialization
type AppRepositories struct {
	auth          models.AuthRepository
	seller        models.SellerRequestRepository
	admin         models.AdminRepository
	adminUser     models.AdminUserRepository
	sellerProduct models.SellerProductRepository
	category      models.CategoryRepository
	userProduct   models.UserProductRepository
}

func setupRepositories(database *gorm.DB) AppRepositories {
	return AppRepositories{
		auth:          repository.NewAuthRepository(database),
		seller:        repository.NewSellerRepository(database),
		admin:         repository.NewAdminRepository(database),
		adminUser:     repository.NewAdminUserRepository(database),
		sellerProduct: repository.NewSellerProductRepository(database),
		category:      repository.NewCategoryRepository(database),
		userProduct:   repository.NewUserProductRepository(database),
	}
}

// Service initialization
type AppServices struct {
	auth models.AuthServices
}

func setupServices(repos AppRepositories) AppServices {
	return AppServices{
		auth: services.NewAuthService(repos.auth),
	}
}

// Route setup
func setupRoutes(app *fiber.App, database *gorm.DB, repos AppRepositories, services AppServices) {
	// API group
	api := app.Group("/api")
	
	// Public routes
	auth := api.Group("/auth")
	handlers.NewUserProductHandler(api.Group("/product"), repos.userProduct)
	handlers.NewAuthHandler(auth, services.auth)

	// Protected routes
	protected := api.Use(middlewares.AuthProtected(database))

	// User routes
	handlers.NewGetUserHandler(protected.Group("/auth"), repos.auth)
	handlers.NewSellerHandler(protected.Group("/user"), repos.seller, repos.auth, database)

	// Admin routes
	handlers.NewAdminHandler(protected.Group("/admin/seller"), repos.admin, database)
	handlers.NewAdminUserHandler(protected.Group("/admin/user"), repos.adminUser, database)

	// Common routes
	handlers.NewCategoryHandler(protected.Group("/category"), repos.category, database)
	handlers.NewSellerProductHandler(protected.Group("/seller/product"), repos.sellerProduct, database)
}

func main() {
	// Initialize components
	database := db.Init(db.DBMigrator)
	app := setupApp()
	repositories := setupRepositories(database)
	services := setupServices(repositories)

	// Setup routes
	setupRoutes(app, database, repositories, services)

	// Start server
	app.Listen(":3000")
}