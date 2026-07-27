-- V5__create_booking_tables.sql
-- Khoi tao cac bang quan ly dat ve va chi tiet ghe dat ve

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
