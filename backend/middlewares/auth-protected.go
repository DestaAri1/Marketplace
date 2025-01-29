package middlewares

import (
	"fmt"
	"os"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"gorm.io/gorm"
)

// func errorMiddleware(ctx *fiber.Ctx, status int, message string) error {
// 	return ctx.Status(status).JSON(&fiber.Map{
// 		"status":  "fail",
// 		"message": message,
// 	})
// }

func AuthProtected(db *gorm.DB) fiber.Handler {
	return func(ctx *fiber.Ctx) error {
		authHeader := ctx.Get("Authorization")
		if authHeader == "" {
			return ctx.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"status":  "fail",
				"message": "Unauthorized",
			})
		}

		tokenParts := strings.Split(authHeader, " ")
		if len(tokenParts) != 2 || tokenParts[0] != "Bearer" {
			return ctx.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"status":  "fail",
				"message": "Unauthorized",
			})
		}

		tokenString := tokenParts[1]
		secret := []byte(os.Getenv("JWT_SECRET"))

		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			if token.Method.Alg() != jwt.SigningMethodHS256.Alg() {
				return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
			}
			return secret, nil
		})

		if err != nil || !token.Valid {
			return ctx.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"status":  "fail",
				"message": "Invalid token",
			})
		}

		// Memeriksa apakah token sudah expired
		claims := token.Claims.(jwt.MapClaims)
		exp := claims["exp"].(float64)
		if time.Now().Unix() > int64(exp) {
			return ctx.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"status":  "fail",
				"message": "Token expired",
			})
		}

		// Set userId ke context
		ctx.Locals("userId", claims["id"])
		return ctx.Next()
	}
}