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
	// eventRepository := repository.NewEventRepositories(db)
	// ticketRepository := repository.NewTicketRepository(db)
	authRepository := repository.NewAuthRepository(db)
	// foodRepository := repository.NewFoodRepositories(db)
	// foodOrderRepository := repository.NewFoodOrderRepository(db)
	// userRepository := repository.NewUserRepository(db)

	//Service
	authService := services.NewAuthService(authRepository)

	//Routing
	server := app.Group("/api")
	handlers.NewAuthHandler(server.Group(("/auth")), authService)
	
	privateRoutes := server.Use(middlewares.AuthProtected(db))
	
	//Handlers
	handlers.NewGetUserHandler(privateRoutes.Group("/auth"), authRepository)
	// handlers.NewUserHandler(privateRoutes.Group("/user"), userRepository, authRepository)
	// handlers.NewEventHandler(privateRoutes.Group("/event"), eventRepository)
	// handlers.NewTicketHandler(privateRoutes.Group("/ticket"), ticketRepository)
	// handlers.NewFoodHandler(privateRoutes.Group("/food"),db, foodRepository)
	// handlers.NewFoodOrderHandler(privateRoutes.Group("food_order"), db, foodOrderRepository)

	app.Listen(":3000")
}