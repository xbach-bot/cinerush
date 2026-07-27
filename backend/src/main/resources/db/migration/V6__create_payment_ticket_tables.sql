-- V6__create_payment_ticket_tables.sql
-- Khoi tao cac bang quan ly thanh toan va ve xem phim

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
