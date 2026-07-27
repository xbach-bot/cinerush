-- V3__create_cinema_tables.sql
-- Khoi tao cac bang quan ly rap chieu, phong chieu va ghe ngoi

CREATE TABLE IF NOT EXISTS cinemas (
    id BIGSERIAL PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    address TEXT NOT NULL,
    province VARCHAR(100),
    district VARCHAR(100),
    phone VARCHAR(20),
    email VARCHAR(255),
    latitude NUMERIC(10,7) CHECK (latitude >= -90 AND latitude <= 90),
    longitude NUMERIC(10,7) CHECK (longitude >= -180 AND longitude <= 180),
    opening_time TIME,
    closing_time TIME,
    timezone VARCHAR(50) DEFAULT 'Asia/Ho_Chi_Minh',
    status VARCHAR(30) DEFAULT 'ACTIVE',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS rooms (
    id BIGSERIAL PRIMARY KEY,
    cinema_id BIGINT NOT NULL REFERENCES cinemas(id) ON DELETE RESTRICT,
    code VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    room_type VARCHAR(30),
    total_seats INTEGER NOT NULL DEFAULT 0 CHECK (total_seats >= 0),
    cleaning_buffer_minutes INTEGER DEFAULT 15 CHECK (cleaning_buffer_minutes >= 0),
    status VARCHAR(30) DEFAULT 'ACTIVE',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uniq_cinema_room UNIQUE (cinema_id, code)
);

CREATE TABLE IF NOT EXISTS seats (
    id BIGSERIAL PRIMARY KEY,
    room_id BIGINT NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
    row_name VARCHAR(10) NOT NULL,
    seat_number INTEGER NOT NULL CHECK (seat_number > 0),
    seat_code VARCHAR(20) NOT NULL,
    seat_type VARCHAR(30) DEFAULT 'STANDARD',
    position_x INTEGER NOT NULL CHECK (position_x >= 0),
    position_y INTEGER NOT NULL CHECK (position_y >= 0),
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uniq_room_seat UNIQUE (room_id, seat_code)
);
