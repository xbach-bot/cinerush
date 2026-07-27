-- V1__create_identity_tables.sql
-- Khoi tao cac bang quan ly tai khoan va phan quyen

CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    phone VARCHAR(20) UNIQUE,
    date_of_birth DATE,
    gender VARCHAR(20),
    avatar_url TEXT,
    status VARCHAR(30) DEFAULT 'ACTIVE',
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS roles (
    id BIGSERIAL PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_roles (
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role_id BIGINT NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    assigned_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    assigned_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
    PRIMARY KEY (user_id, role_id)
);

-- Seed cac vai tro mac dinh trong he thong
INSERT INTO roles (code, name, description) VALUES
('ADMIN', 'Administrator', 'System administrator with full permissions'),
('CUSTOMER', 'Customer', 'End user customer who books tickets'),
('CINEMA_MANAGER', 'Cinema Manager', 'Manager responsible for cinema rooms and showtimes'),
('TICKET_CHECKER', 'Ticket Checker', 'Staff responsible for checking and validating tickets');
