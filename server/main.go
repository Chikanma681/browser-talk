package main

import (
	"flag"
	"fmt"
	"log"
	"os"

	"browser-talk/internal/api"
	"browser-talk/internal/routes"
	"github.com/joho/godotenv"  // Add this import
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	// Load .env file
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using environment variables")
	}

	var port int
	flag.IntVar(&port, "port", 8080, "BrowserTalk backend port")
	flag.Parse()

	requiredEnvVars := []string{
		"TWILIO_ACCOUNT_SID",
		"TWILIO_AUTH_TOKEN",
		"TWILIO_PHONE_NUMBER",
	}

	for _, envVar := range requiredEnvVars {
		if os.Getenv(envVar) == "" {
			log.Fatalf("Missing required environment variable: %s", envVar)
		}
	}

	apiHandler := api.NewHandler()

	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.Gzip())
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{echo.GET, echo.POST, echo.OPTIONS},
		AllowHeaders: []string{echo.HeaderContentType, echo.HeaderAuthorization},
	}))

	routes.SetupRoutes(e, apiHandler)

	addr := fmt.Sprintf(":%d", port)
	log.Printf("🚀 BrowserTalk server starting on http://localhost%s", addr)
	e.Logger.Fatal(e.Start(addr))
}