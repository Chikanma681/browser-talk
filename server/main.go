package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/chikanma681/browser-talk/internal/api"
	"github.com/chikanma681/browser-talk/internal/routes"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func main() {
	var port int
	flag.IntVar(&port, "port", 8080, "BrowserTalk backend port")
	flag.Parse()

	// Validate required environment variables
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

	// Initialize API handler
	apiHandler := api.NewHandler()

	// Setup router
	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(middleware.Compress(5))

	// CORS for browser clients
	r.Use(func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
			
			if r.Method == "OPTIONS" {
				w.WriteHeader(http.StatusOK)
				return
			}
			
			next.ServeHTTP(w, r)
		})
	})

	// Mount routes
	routes.SetupRoutes(r, apiHandler)

	// Start server
	addr := fmt.Sprintf(":%d", port)
	log.Printf("🚀 BrowserTalk server starting on http://localhost%s", addr)
	log.Fatal(http.ListenAndServe(addr, r))
}