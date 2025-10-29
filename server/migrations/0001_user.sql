--- +goose Up
--- +goose StatementBegin

CREATE TABLE IF NOT EXISTS users {
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    balance DECIMAL(10,2) NOT NULL DFAULT 0.00,
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
};

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_user_id ON users(id);

CREATE TABLE IF NOT EXISTS countries {
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    iso CHAR(2) NOT NULL, -- ISO 3166-1 alpha-2
    country_code CHAR(10) NOT NULL,  -- +234 example
    rate_per_minute DECIMAL(10,3) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
};

--- +goose StatementEnd
--- +goose Down
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS countries;
--- +goose StatementEnd