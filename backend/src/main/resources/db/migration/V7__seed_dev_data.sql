-- V7__seed_dev_data.sql
-- Seed du lieu mau cho phat trien (dev environment)

-- 1. Seed users (Mat khau mac dinh la 'password123')
INSERT INTO users (email, password_hash, full_name, phone, date_of_birth, gender, status, email_verified) VALUES
('admin@cinerush.com', '$2a$10$wN9Q.Q4Q6G2h7Y6f.yD2Fe1mK7eUvB3H6V8LwK57V6nI7eO8jP3Jq', 'Admin Cinerush', '0901234567', '1990-01-01', 'MALE', 'ACTIVE', true),
('customer@cinerush.com', '$2a$10$wN9Q.Q4Q6G2h7Y6f.yD2Fe1mK7eUvB3H6V8LwK57V6nI7eO8jP3Jq', 'Customer Cinerush', '0907654321', '1995-10-10', 'FEMALE', 'ACTIVE', true),
('manager@cinerush.com', '$2a$10$wN9Q.Q4Q6G2h7Y6f.yD2Fe1mK7eUvB3H6V8LwK57V6nI7eO8jP3Jq', 'Manager Cinerush', '0901122334', '1992-05-05', 'MALE', 'ACTIVE', true),
('checker@cinerush.com', '$2a$10$wN9Q.Q4Q6G2h7Y6f.yD2Fe1mK7eUvB3H6V8LwK57V6nI7eO8jP3Jq', 'Checker Cinerush', '0905566778', '1998-12-12', 'FEMALE', 'ACTIVE', true);

-- 2. Lien ket users voi roles
INSERT INTO user_roles (user_id, role_id) VALUES
((SELECT id FROM users WHERE email = 'admin@cinerush.com'), (SELECT id FROM roles WHERE code = 'ADMIN')),
((SELECT id FROM users WHERE email = 'customer@cinerush.com'), (SELECT id FROM roles WHERE code = 'CUSTOMER')),
((SELECT id FROM users WHERE email = 'manager@cinerush.com'), (SELECT id FROM roles WHERE code = 'CINEMA_MANAGER')),
((SELECT id FROM users WHERE email = 'checker@cinerush.com'), (SELECT id FROM roles WHERE code = 'TICKET_CHECKER'));

-- 3. Seed the loai phim (genres)
INSERT INTO genres (name, slug, description, active) VALUES
('Hành động', 'hanh-dong', 'Phim hành động kịch tính', true),
('Hài hước', 'hai-huoc', 'Phim hài vui nhộn', true),
('Tình cảm', 'tinh-cam', 'Phim tâm lý tình cảm lãng mạn', true),
('Khoa học viễn tưởng', 'khoa-hoc-vien-tuong', 'Phim viễn tưởng tương lai', true),
('Kinh dị', 'kinh-di', 'Phim kinh dị rùng rợn', true);

-- 4. Seed phim (movies)
INSERT INTO movies (title, original_title, slug, short_description, description, duration_minutes, release_date, end_date, production_year, age_rating, status, featured) VALUES
('Dune: Hành Tinh Cát - Phần Hai', 'Dune: Part Two', 'dune-hanh-tinh-cat-phan-hai', 'Hành trình tiếp theo của Paul Atreides', 'Mô tả chi tiết về bộ phim bom tấn Dune Part Two...', 166, '2026-03-01', '2026-09-01', 2024, 'T16', 'PUBLISHED', true),
('Những Mảnh Ghép Cảm Xúc 2', 'Inside Out 2', 'nhung-manh-ghep-cam-xuc-2', 'Cuộc phiêu lưu mới trong tâm trí Riley khi bước vào tuổi dậy thì', 'Mô tả chi tiết về phim hoạt hình Inside Out 2...', 96, '2026-06-01', '2026-10-01', 2024, 'P', 'PUBLISHED', true);

-- 5. Lien ket the loai voi phim (movie_genres)
INSERT INTO movie_genres (movie_id, genre_id) VALUES
((SELECT id FROM movies WHERE slug = 'dune-hanh-tinh-cat-phan-hai'), (SELECT id FROM genres WHERE slug = 'hanh-dong')),
((SELECT id FROM movies WHERE slug = 'dune-hanh-tinh-cat-phan-hai'), (SELECT id FROM genres WHERE slug = 'khoa-hoc-vien-tuong')),
((SELECT id FROM movies WHERE slug = 'nhung-manh-ghep-cam-xuc-2'), (SELECT id FROM genres WHERE slug = 'hai-huoc')),
((SELECT id FROM movies WHERE slug = 'nhung-manh-ghep-cam-xuc-2'), (SELECT id FROM genres WHERE slug = 'tinh-cam'));

-- 6. Seed phien ban phim (movie_versions)
INSERT INTO movie_versions (movie_id, name, format, audio_language_id, subtitle_language_id, duration_minutes, status) VALUES
((SELECT id FROM movies WHERE slug = 'dune-hanh-tinh-cat-phan-hai'), 'Dune 2 - IMAX 3D', '3D', 'ENG', 'VIE', 166, 'ACTIVE'),
((SELECT id FROM movies WHERE slug = 'dune-hanh-tinh-cat-phan-hai'), 'Dune 2 - 2D Lồng tiếng', '2D', 'VIE', NULL, 166, 'ACTIVE'),
((SELECT id FROM movies WHERE slug = 'nhung-manh-ghep-cam-xuc-2'), 'Inside Out 2 - 2D Phụ đề', '2D', 'ENG', 'VIE', 96, 'ACTIVE');

-- 7. Seed rap (cinemas)
INSERT INTO cinemas (code, name, slug, address, province, district, phone, email, latitude, longitude, opening_time, closing_time, timezone, status) VALUES
('CR-HV', 'CineRush CGV Hùng Vương Plaza', 'cinerush-cgv-hung-vuong-plaza', '126 Hồng Bàng, Phường 12, Quận 5, TP.HCM', 'TP.HCM', 'Quận 5', '02838573388', 'contact@cinerush.com', 10.7558, 106.6621, '08:00:00', '23:30:00', 'Asia/Ho_Chi_Minh', 'ACTIVE');

-- 8. Seed phong (rooms)
INSERT INTO rooms (cinema_id, code, name, room_type, total_seats, cleaning_buffer_minutes, status) VALUES
((SELECT id FROM cinemas WHERE code = 'CR-HV'), 'R01', 'Phòng Chiếu 1 (IMAX)', 'IMAX', 20, 15, 'ACTIVE'),
((SELECT id FROM cinemas WHERE code = 'CR-HV'), 'R02', 'Phòng Chiếu 2 (Standard)', 'STANDARD', 20, 15, 'ACTIVE');

-- 9. Seed ghe ngoi (seats) - 20 ghe cho moi phong
-- Phong 1
INSERT INTO seats (room_id, row_name, seat_number, seat_code, seat_type, position_x, position_y, active) VALUES
((SELECT id FROM rooms WHERE code = 'R01' AND cinema_id = (SELECT id FROM cinemas WHERE code = 'CR-HV')), 'A', 1, 'A01', 'STANDARD', 1, 1, true),
((SELECT id FROM rooms WHERE code = 'R01' AND cinema_id = (SELECT id FROM cinemas WHERE code = 'CR-HV')), 'A', 2, 'A02', 'STANDARD', 2, 1, true),
((SELECT id FROM rooms WHERE code = 'R01' AND cinema_id = (SELECT id FROM cinemas WHERE code = 'CR-HV')), 'A', 3, 'A03', 'STANDARD', 3, 1, true),
((SELECT id FROM rooms WHERE code = 'R01' AND cinema_id = (SELECT id FROM cinemas WHERE code = 'CR-HV')), 'A', 4, 'A04', 'STANDARD', 4, 1, true),
((SELECT id FROM rooms WHERE code = 'R01' AND cinema_id = (SELECT id FROM cinemas WHERE code = 'CR-HV')), 'A', 5, 'A05', 'STANDARD', 5, 1, true),
((SELECT id FROM rooms WHERE code = 'R01' AND cinema_id = (SELECT id FROM cinemas WHERE code = 'CR-HV')), 'A', 6, 'A06', 'STANDARD', 6, 1, true),
((SELECT id FROM rooms WHERE code = 'R01' AND cinema_id = (SELECT id FROM cinemas WHERE code = 'CR-HV')), 'A', 7, 'A07', 'STANDARD', 7, 1, true),
((SELECT id FROM rooms WHERE code = 'R01' AND cinema_id = (SELECT id FROM cinemas WHERE code = 'CR-HV')), 'A', 8, 'A08', 'STANDARD', 8, 1, true),
((SELECT id FROM rooms WHERE code = 'R01' AND cinema_id = (SELECT id FROM cinemas WHERE code = 'CR-HV')), 'A', 9, 'A09', 'STANDARD', 9, 1, true),
((SELECT id FROM rooms WHERE code = 'R01' AND cinema_id = (SELECT id FROM cinemas WHERE code = 'CR-HV')), 'A', 10, 'A10', 'STANDARD', 10, 1, true),
((SELECT id FROM rooms WHERE code = 'R01' AND cinema_id = (SELECT id FROM cinemas WHERE code = 'CR-HV')), 'B', 1, 'B01', 'VIP', 1, 2, true),
((SELECT id FROM rooms WHERE code = 'R01' AND cinema_id = (SELECT id FROM cinemas WHERE code = 'CR-HV')), 'B', 2, 'B02', 'VIP', 2, 2, true),
((SELECT id FROM rooms WHERE code = 'R01' AND cinema_id = (SELECT id FROM cinemas WHERE code = 'CR-HV')), 'B', 3, 'B03', 'VIP', 3, 2, true),
((SELECT id FROM rooms WHERE code = 'R01' AND cinema_id = (SELECT id FROM cinemas WHERE code = 'CR-HV')), 'B', 4, 'B04', 'VIP', 4, 2, true),
((SELECT id FROM rooms WHERE code = 'R01' AND cinema_id = (SELECT id FROM cinemas WHERE code = 'CR-HV')), 'B', 5, 'B05', 'VIP', 5, 2, true),
((SELECT id FROM rooms WHERE code = 'R01' AND cinema_id = (SELECT id FROM cinemas WHERE code = 'CR-HV')), 'B', 6, 'B06', 'VIP', 6, 2, true),
((SELECT id FROM rooms WHERE code = 'R01' AND cinema_id = (SELECT id FROM cinemas WHERE code = 'CR-HV')), 'B', 7, 'B07', 'VIP', 7, 2, true),
((SELECT id FROM rooms WHERE code = 'R01' AND cinema_id = (SELECT id FROM cinemas WHERE code = 'CR-HV')), 'B', 8, 'B08', 'VIP', 8, 2, true),
((SELECT id FROM rooms WHERE code = 'R01' AND cinema_id = (SELECT id FROM cinemas WHERE code = 'CR-HV')), 'B', 9, 'B09', 'VIP', 9, 2, true),
((SELECT id FROM rooms WHERE code = 'R01' AND cinema_id = (SELECT id FROM cinemas WHERE code = 'CR-HV')), 'B', 10, 'B10', 'VIP', 10, 2, true);

-- Phong 2
INSERT INTO seats (room_id, row_name, seat_number, seat_code, seat_type, position_x, position_y, active) VALUES
((SELECT id FROM rooms WHERE code = 'R02' AND cinema_id = (SELECT id FROM cinemas WHERE code = 'CR-HV')), 'A', 1, 'A01', 'STANDARD', 1, 1, true),
((SELECT id FROM rooms WHERE code = 'R02' AND cinema_id = (SELECT id FROM cinemas WHERE code = 'CR-HV')), 'A', 2, 'A02', 'STANDARD', 2, 1, true),
((SELECT id FROM rooms WHERE code = 'R02' AND cinema_id = (SELECT id FROM cinemas WHERE code = 'CR-HV')), 'A', 3, 'A03', 'STANDARD', 3, 1, true),
((SELECT id FROM rooms WHERE code = 'R02' AND cinema_id = (SELECT id FROM cinemas WHERE code = 'CR-HV')), 'A', 4, 'A04', 'STANDARD', 4, 1, true),
((SELECT id FROM rooms WHERE code = 'R02' AND cinema_id = (SELECT id FROM cinemas WHERE code = 'CR-HV')), 'A', 5, 'A05', 'STANDARD', 5, 1, true),
((SELECT id FROM rooms WHERE code = 'R02' AND cinema_id = (SELECT id FROM cinemas WHERE code = 'CR-HV')), 'A', 6, 'A06', 'STANDARD', 6, 1, true),
((SELECT id FROM rooms WHERE code = 'R02' AND cinema_id = (SELECT id FROM cinemas WHERE code = 'CR-HV')), 'A', 7, 'A07', 'STANDARD', 7, 1, true),
((SELECT id FROM rooms WHERE code = 'R02' AND cinema_id = (SELECT id FROM cinemas WHERE code = 'CR-HV')), 'A', 8, 'A08', 'STANDARD', 8, 1, true),
((SELECT id FROM rooms WHERE code = 'R02' AND cinema_id = (SELECT id FROM cinemas WHERE code = 'CR-HV')), 'A', 9, 'A09', 'STANDARD', 9, 1, true),
((SELECT id FROM rooms WHERE code = 'R02' AND cinema_id = (SELECT id FROM cinemas WHERE code = 'CR-HV')), 'A', 10, 'A10', 'STANDARD', 10, 1, true),
((SELECT id FROM rooms WHERE code = 'R02' AND cinema_id = (SELECT id FROM cinemas WHERE code = 'CR-HV')), 'B', 1, 'B01', 'VIP', 1, 2, true),
((SELECT id FROM rooms WHERE code = 'R02' AND cinema_id = (SELECT id FROM cinemas WHERE code = 'CR-HV')), 'B', 2, 'B02', 'VIP', 2, 2, true),
((SELECT id FROM rooms WHERE code = 'R02' AND cinema_id = (SELECT id FROM cinemas WHERE code = 'CR-HV')), 'B', 3, 'B03', 'VIP', 3, 2, true),
((SELECT id FROM rooms WHERE code = 'R02' AND cinema_id = (SELECT id FROM cinemas WHERE code = 'CR-HV')), 'B', 4, 'B04', 'VIP', 4, 2, true),
((SELECT id FROM rooms WHERE code = 'R02' AND cinema_id = (SELECT id FROM cinemas WHERE code = 'CR-HV')), 'B', 5, 'B05', 'VIP', 5, 2, true),
((SELECT id FROM rooms WHERE code = 'R02' AND cinema_id = (SELECT id FROM cinemas WHERE code = 'CR-HV')), 'B', 6, 'B06', 'VIP', 6, 2, true),
((SELECT id FROM rooms WHERE code = 'R02' AND cinema_id = (SELECT id FROM cinemas WHERE code = 'CR-HV')), 'B', 7, 'B07', 'VIP', 7, 2, true),
((SELECT id FROM rooms WHERE code = 'R02' AND cinema_id = (SELECT id FROM cinemas WHERE code = 'CR-HV')), 'B', 8, 'B08', 'VIP', 8, 2, true),
((SELECT id FROM rooms WHERE code = 'R02' AND cinema_id = (SELECT id FROM cinemas WHERE code = 'CR-HV')), 'B', 9, 'B09', 'VIP', 9, 2, true),
((SELECT id FROM rooms WHERE code = 'R02' AND cinema_id = (SELECT id FROM cinemas WHERE code = 'CR-HV')), 'B', 10, 'B10', 'VIP', 10, 2, true);

-- 10. Seed suat chieu (showtimes)
INSERT INTO showtimes (movie_version_id, room_id, start_time, end_time, base_price, status, booking_open_at, booking_close_at) VALUES
((SELECT id FROM movie_versions WHERE name = 'Dune 2 - IMAX 3D'), (SELECT id FROM rooms WHERE code = 'R01' AND cinema_id = (SELECT id FROM cinemas WHERE code = 'CR-HV')), '2026-08-01 10:00:00', '2026-08-01 12:46:00', 150000.00, 'PUBLISHED', '2026-07-28 08:00:00', '2026-08-01 09:45:00'),
((SELECT id FROM movie_versions WHERE name = 'Dune 2 - 2D Lồng tiếng'), (SELECT id FROM rooms WHERE code = 'R01' AND cinema_id = (SELECT id FROM cinemas WHERE code = 'CR-HV')), '2026-08-02 14:00:00', '2026-08-02 16:46:00', 90000.00, 'PUBLISHED', '2026-07-28 08:00:00', '2026-08-02 13:45:00');

-- 11. Tu dong sinh ghe cho tung suat chieu (showtime_seats)
INSERT INTO showtime_seats (showtime_id, seat_id, status, price)
SELECT 
    s.id AS showtime_id,
    se.id AS seat_id,
    'AVAILABLE' AS status,
    CASE 
        WHEN se.seat_type = 'VIP' THEN s.base_price + 30000.00
        ELSE s.base_price
    END AS price
FROM showtimes s
JOIN rooms r ON s.room_id = r.id
JOIN seats se ON se.room_id = r.id
WHERE r.code = 'R01';
