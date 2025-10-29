package routes

import (
	"browser-talk/internal/api"

	"github.com/labstack/echo/v4"
)

// SetupRoutes configures all application routes
func SetupRoutes(e *echo.Echo, h *api.Handler) {
	// Health check
	e.GET("/health", h.HealthCheck)

	// API routes
	apiGroup := e.Group("/api")
	{
		// Twilio token generation for browser client
		apiGroup.GET("/token", h.GenerateToken)

		// Twilio voice webhooks
		apiGroup.POST("/voice", h.HandleVoice)
		apiGroup.POST("/voice/status", h.CallStatus)
	}

	// Auth routes (for future user management)
	// authGroup := e.Group("/auth")
	// {
	// 	authGroup.POST("/register", h.Register)
	// 	authGroup.POST("/login", h.Login)
	// }
}
