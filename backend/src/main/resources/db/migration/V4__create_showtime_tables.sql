-- V4__create_showtime_tables.sql
-- Khoi tao cac bang quan ly suat chieu va ghe cua tung suat chieu

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

CREATE TABLE IF NOT EXISTS showtime_seats (
    id BIGSERIAL PRIMARY KEY,
    showtime_id BIGINT NOT NULL REFERENCES showtimes(id) ON DELETE CASCADE,
    seat_id BIGINT NOT NULL REFERENCES seats(id) ON DELETE RESTRICT,
    status VARCHAR(30) DEFAULT 'AVAILABLE',
    price NUMERIC(12,2) NOT NULL CHECK (price >= 0),
    hold_token VARCHAR(100),
    hold_expires_at TIMESTAMP,
    version BIGINT NOT NULL DEFAULT 0,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uniq_showtime_seat UNIQUE (showtime_id, seat_id)
);
