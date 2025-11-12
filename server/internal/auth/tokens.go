package auth

import (
	// echojwt "github.com/labstack/echo-jwt/v4"
	// "github.com/labstack/echo/v4"
	// "net/http"
	"fmt"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

type  Claims struct {
	Name      string
	UserID    string
	TokenType string
	jwt.RegisteredClaims
}

type Tokens struct {
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
}

// GenerateAccessToken generates ONLY an access token (used for token refresh)
func GenerateAccessToken(Name string, UserID string) (string, error) {
	claims := &Claims{
		Name:      Name,
		UserID:    UserID,
		TokenType: "access",
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(15 * time.Minute)),
			Issuer:    "BrowserTalk",
		},
	}

	accessToken := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	signedAccessToken, err := accessToken.SignedString([]byte("your-secret-key"))

	if err != nil {
		return "", fmt.Errorf("failed to sign access token: %w", err)
	}

	return signedAccessToken, nil
}

func GenerateJWTToken(Name string, UserID string) (Tokens, error) {
	// Generate access token
	accessToken, err := GenerateAccessToken(Name, UserID)
	if err != nil {
		return Tokens{}, err
	}

	refreshClaims := &Claims{
		Name:      Name,
		UserID:    UserID,
		TokenType: "refresh",
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(30 * 24 * time.Hour)),
			Issuer:    "BrowserTalk",
		},
	}
	refreshToken := jwt.NewWithClaims(jwt.SigningMethodHS256, refreshClaims)
	signedRefreshToken, err := refreshToken.SignedString([]byte("your-secret-key"))

	if err != nil {
		return Tokens{}, fmt.Errorf("failed to sign refresh token: %w", err)
	}

	return Tokens{
		AccessToken:  accessToken,
		RefreshToken: signedRefreshToken,
	}, nil
}

func VerifyJWTToken(tokenString string) (*Claims, error) {
	token, err := jwt.ParseWithClaims(tokenString, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte("your-secret-key"), nil
	})

	if err != nil {
		return nil, fmt.Errorf("failed to parse token: %w", err)
	}

	if claims, ok := token.Claims.(*Claims); ok && token.Valid {
		return claims, nil
	}

	return nil, fmt.Errorf("invalid token")
}
