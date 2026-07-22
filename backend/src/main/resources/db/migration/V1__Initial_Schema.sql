-- V1__Initial_Schema.sql
-- Khoi tao co so du lieu cho du an Cinerush (MVP)

-- 1. Bang users
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

-- 2. Bang roles
CREATE TABLE IF NOT EXISTS roles (
    id BIGSERIAL PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 3. Bang user_roles (Quan he nhieu-nhieu giua users va roles)
CREATE TABLE IF NOT EXISTS user_roles (
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role_id BIGINT NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    assigned_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    assigned_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
    PRIMARY KEY (user_id, role_id)
);

-- 4. Bang movies
CREATE TABLE IF NOT EXISTS movies (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    original_title VARCHAR(255),
    slug VARCHAR(255) NOT NULL UNIQUE,
    short_description VARCHAR(500),
    description TEXT,
    duration_minutes INTEGER NOT NULL CHECK (duration_minutes > 0),
    release_date DATE,
    end_date DATE,
    production_year INTEGER CHECK (production_year >= 1888),
    age_rating VARCHAR(20),
    age_rating_description VARCHAR(255),
    poster_url TEXT,
    banner_url TEXT,
    trailer_url TEXT,
    status VARCHAR(30) DEFAULT 'DRAFT',
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    CONSTRAINT chk_end_date CHECK (end_date >= release_date OR end_date IS NULL)
);

-- 5. Bang genres
CREATE TABLE IF NOT EXISTS genres (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 6. Bang movie_genres (Quan he nhieu-nhieu giua movies va genres)
CREATE TABLE IF NOT EXISTS movie_genres (
    movie_id BIGINT NOT NULL REFERENCES movies(id) ON DELETE CASCADE,
    genre_id BIGINT NOT NULL REFERENCES genres(id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (movie_id, genre_id)
);

-- 7. Bang movie_versions
CREATE TABLE IF NOT EXISTS movie_versions (
    id BIGSERIAL PRIMARY KEY,
    movie_id BIGINT NOT NULL REFERENCES movies(id) ON DELETE RESTRICT,
    name VARCHAR(150),
    format VARCHAR(30),
    audio_language_id VARCHAR(50),
    subtitle_language_id VARCHAR(50),
    duration_minutes INTEGER CHECK (duration_minutes > 0 OR duration_minutes IS NULL),
    status VARCHAR(30) DEFAULT 'ACTIVE',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 8. Bang cinemas
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

-- 9. Bang rooms
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

-- 10. Bang seats
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

-- 11. Bang showtimes
CREATE TABLE IF NOT EXISTS showtimes (
    id BIGSERIAL PRIMARY KEY,
    movie_version_id BIGINT NOT NULL REFERENCES movie_versions(id) ON DELETE RESTRICT,
    room_id BIGINT NOT NULL REFERENCES rooms(id) ON DELETE RESTRICT,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    base_price NUMERIC(12,2) NOT NULL CHECK (base_price >= 0),
    status VARCHAR(30) DEFAULT 'DRAFT',
    booking_open_at TIMESTAMP,
    booking_close_at TIMESTAMP,
    created_by BIGINT REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_showtime_time CHECK (end_time > start_time),
    CONSTRAINT chk_booking_close CHECK (booking_close_at IS NULL OR booking_close_at < start_time)
);

-- 12. Bang showtime_seats
CREATE TABLE IF NOT EXISTS showtime_seats (
    id BIGSERIAL PRIMARY KEY,
    showtime_id BIGINT NOT NULL REFERENCES showtimes(id) ON DELETE CASCADE,
    seat_id BIGINT NOT NULL REFERENCES seats(id) ON DELETE RESTRICT,
    status VARCHAR(30) DEFAULT 'AVAILABLE',
    price NUMERIC(12,2) NOT NULL CHECK (price >= 0),
    hold_token VARCHAR(100),
    hold_expires_at TIMESTAMP,
    version BIGINT NOT NULL DEFAULT 0,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 13. Bang bookings
CREATE TABLE IF NOT EXISTS bookings (
    id BIGSERIAL PRIMARY KEY,
    booking_code VARCHAR(50) NOT NULL UNIQUE,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    showtime_id BIGINT NOT NULL REFERENCES showtimes(id) ON DELETE RESTRICT,
    status VARCHAR(30) DEFAULT 'PENDING',
    subtotal NUMERIC(12,2) NOT NULL CHECK (subtotal >= 0),
    discount_amount NUMERIC(12,2) DEFAULT 0 CHECK (discount_amount >= 0),
    fee_amount NUMERIC(12,2) DEFAULT 0 CHECK (fee_amount >= 0),
    total_amount NUMERIC(12,2) NOT NULL CHECK (total_amount >= 0),
    expires_at TIMESTAMP,
    idempotency_key VARCHAR(100) NOT NULL UNIQUE,
    cancelled_at TIMESTAMP,
    cancellation_reason VARCHAR(500),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 14. Bang booking_items
CREATE TABLE IF NOT EXISTS booking_items (
    id BIGSERIAL PRIMARY KEY,
    booking_id BIGINT NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    showtime_seat_id BIGINT NOT NULL REFERENCES showtime_seats(id) ON DELETE RESTRICT,
    seat_code_snapshot VARCHAR(20) NOT NULL,
    seat_type_snapshot VARCHAR(30) NOT NULL,
    base_price NUMERIC(12,2) NOT NULL CHECK (base_price >= 0),
    surcharge NUMERIC(12,2) DEFAULT 0,
    discount_amount NUMERIC(12,2) DEFAULT 0 CHECK (discount_amount >= 0),
    final_price NUMERIC(12,2) NOT NULL CHECK (final_price >= 0),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uniq_booking_seat UNIQUE (booking_id, showtime_seat_id)
);

-- 15. Bang payments
CREATE TABLE IF NOT EXISTS payments (
    id BIGSERIAL PRIMARY KEY,
    booking_id BIGINT NOT NULL REFERENCES bookings(id) ON DELETE RESTRICT,
    transaction_code VARCHAR(100) NOT NULL UNIQUE,
    payment_method VARCHAR(30) NOT NULL,
    amount NUMERIC(12,2) NOT NULL CHECK (amount >= 0),
    status VARCHAR(30) NOT NULL,
    provider_response JSONB,
    paid_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 16. Bang tickets
CREATE TABLE IF NOT EXISTS tickets (
    id BIGSERIAL PRIMARY KEY,
    ticket_code VARCHAR(50) NOT NULL UNIQUE,
    booking_item_id BIGINT NOT NULL REFERENCES booking_items(id) ON DELETE RESTRICT,
    qr_token VARCHAR(255) NOT NULL UNIQUE,
    status VARCHAR(30) DEFAULT 'VALID',
    issued_at TIMESTAMP NOT NULL,
    used_at TIMESTAMP,
    cancelled_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uniq_ticket_item UNIQUE (booking_item_id)
);
