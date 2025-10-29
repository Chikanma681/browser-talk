package api

import (
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/labstack/echo/v4"
)

// Handler handles all API requests
type Handler struct {
	twilioAccountSID  string
	twilioAuthToken   string
	twilioPhoneNumber string
}

// NewHandler creates a new API handler
func NewHandler() *Handler {
	return &Handler{
		twilioAccountSID:  os.Getenv("TWILIO_ACCOUNT_SID"),
		twilioAuthToken:   os.Getenv("TWILIO_AUTH_TOKEN"),
		twilioPhoneNumber: os.Getenv("TWILIO_PHONE_NUMBER"),
	}
}

// HealthCheck returns server health status
func (h *Handler) HealthCheck(c echo.Context) error {
	return c.JSON(http.StatusOK, map[string]interface{}{
		"status": "healthy",
		"time":   time.Now().UTC(),
	})
}

// GenerateToken generates a Twilio access token for the browser client
func (h *Handler) GenerateToken(c echo.Context) error {
	identity := c.QueryParam("identity")
	if identity == "" {
		identity = fmt.Sprintf("user_%d", time.Now().Unix())
	}

	// Create JWT token for Twilio
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"jti": fmt.Sprintf("%s-%d", h.twilioAccountSID, time.Now().Unix()),
		"iss": h.twilioAccountSID,
		"sub": h.twilioAccountSID,
		"exp": time.Now().Add(time.Hour * 1).Unix(),
		"grants": map[string]interface{}{
			"identity": identity,
			"voice": map[string]interface{}{
				"incoming": map[string]interface{}{
					"allow": true,
				},
				"outgoing": map[string]interface{}{
					"application_sid": h.twilioAccountSID,
				},
			},
		},
	})

	// Sign the token with Twilio Auth Token
	tokenString, err := token.SignedString([]byte(h.twilioAuthToken))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Failed to generate token",
		})
	}

	return c.JSON(http.StatusOK, map[string]string{
		"token":    tokenString,
		"identity": identity,
	})
}

// HandleVoice handles Twilio voice webhook
func (h *Handler) HandleVoice(c echo.Context) error {
	// Get the phone number to call from the request
	to := c.FormValue("To")

	if to == "" {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "Missing 'To' parameter",
		})
	}

	// Generate TwiML response to make the call
	twiml := fmt.Sprintf(`<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Dial callerId="%s">
        <Number>%s</Number>
    </Dial>
</Response>`, h.twilioPhoneNumber, to)

	// Return TwiML as XML
	return c.XMLBlob(http.StatusOK, []byte(twiml))
}

// CallStatus handles call status callbacks from Twilio
func (h *Handler) CallStatus(c echo.Context) error {
	// Parse callback parameters
	callSid := c.FormValue("CallSid")
	callStatus := c.FormValue("CallStatus")
	from := c.FormValue("From")
	to := c.FormValue("To")
	duration := c.FormValue("CallDuration")

	// Log the call status (you can store this in database)
	c.Logger().Infof("Call Status Update - SID: %s, Status: %s, From: %s, To: %s, Duration: %s",
		callSid, callStatus, from, to, duration)

	// You can add logic here to:
	// - Store call logs in database
	// - Send notifications
	// - Update call records
	// - Bill users based on duration

	return c.NoContent(http.StatusOK)
}
