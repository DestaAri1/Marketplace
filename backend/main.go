package main

import (
	"github.com/DestaAri1/database"
	"github.com/DestaAri1/handlers"
	"github.com/DestaAri1/middlewares"
	"github.com/DestaAri1/repositories"
	"github.com/DestaAri1/sevices"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	db := db.Init(db.DBMigrator)
	app := fiber.New(fiber.Config{
		AppName: "TicketBooking",
		ServerHeader: "Fiber",
	})

	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:5000", // Ganti dengan URL front-end React kamu
		AllowMethods: "GET, POST, PUT, DELETE, OPTIONS",
	}))


	//Repositories
	authRepository := repository.NewAuthRepository(db)
	sellerRepository := repository.NewSellerRepository(db)
	adminRepository := repository.NewAdminRepository(db)
	adminUserRepository := repository.NewAdminUserRepository(db)
	sellerProductRepository := repository.NewSellerProductRepository(db)
	categoryRepository := repository.NewCategoryRepository(db)

	//Service
	authService := services.NewAuthService(authRepository)

	//Routing
	server := app.Group("/api")
	handlers.NewAuthHandler(server.Group(("/auth")), authService)
	
	privateRoutes := server.Use(middlewares.AuthProtected(db))
	
	//Handlers
	handlers.NewGetUserHandler(privateRoutes.Group("/auth"), authRepository)

	// Admin
	handlers.NewAdminHandler(privateRoutes.Group("/admin/seller"), adminRepository, db)
	handlers.NewAdminUserHandler(privateRoutes.Group("/admin/user"), adminUserRepository, db)

	// Admin and All
	handlers.NewCategoryHandler(privateRoutes.Group("/category"), categoryRepository, db)

	//Seller
	handlers.NewSellerHandler(privateRoutes.Group("/seller"), sellerRepository, authRepository)
	handlers.NewSellerProductHandler(privateRoutes.Group("/seller/product"), sellerProductRepository, db)

	//All

	app.Listen(":3000")
}