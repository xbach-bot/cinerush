# Cinerush - Hệ Thống Đặt Vé Xem Phim MVP

Cinerush là dự án hệ thống đặt vé xem phim được phát triển dưới dạng kiến trúc Monorepo, bao gồm Backend Spring Boot và Frontend React (Vite + TypeScript).

---

## 🛠️ Hướng Dẫn Cài Đặt và Khởi Chạy Nhanh

### 1. Khởi chạy cơ sở dữ liệu qua Docker Compose
Yêu cầu máy tính cài đặt sẵn **Docker** và **Docker Compose**.

1. Mở terminal tại thư mục gốc của dự án.
2. Tạo file cấu hình môi trường `.env` từ file mẫu:
   ```bash
   cp .env.example .env
   ```
3. Khởi chạy PostgreSQL và Redis bằng lệnh:
   ```bash
   docker compose up -d
   ```
   *Cơ sở dữ liệu PostgreSQL chạy ở cổng `5433` (Local) và Redis chạy ở cổng `6379`.*

---

### 2. Khởi chạy Backend (Spring Boot)
Yêu cầu máy tính cài đặt sẵn **JDK 21** và **Maven**.

1. Di chuyển vào thư mục `backend`:
   ```bash
   cd backend
   ```
2. Tạo file cấu hình môi trường `.env` chạy local (nếu cần điều chỉnh cổng hoặc thông tin đăng nhập):
   ```bash
   cp .env.example .env
   ```
3. Chạy ứng dụng Spring Boot:
   - Trên Linux/macOS:
     ```bash
     ./mvnw spring-boot:run
     ```
   - Trên Windows (PowerShell/CMD):
     ```cmd
     mvnw.cmd spring-boot:run
     ```
   *Flyway sẽ tự động kích hoạt và thực thi tất cả các bản migration từ V1 đến V7 (Bao gồm cả seed dữ liệu mẫu).*
   *API backend sẽ lắng nghe tại: [http://localhost:8080](http://localhost:8080)*

---

### 3. Khởi chạy Frontend (React + Vite)
Yêu cầu máy tính cài đặt sẵn **Node.js (phiên bản v18 hoặc v20 trở lên)**.

1. Di chuyển vào thư mục `frontend`:
   ```bash
   cd frontend
   ```
2. Tạo file cấu hình môi trường `.env`:
   ```bash
   cp .env.example .env
   ```
3. Cài đặt các thư viện phụ thuộc:
   ```bash
   npm install
   ```
4. Khởi chạy máy chủ phát triển (dev server):
   ```bash
   npm run dev
   ```
   *Ứng dụng frontend sẽ chạy tại: [http://localhost:5173](http://localhost:5173)*

---

## 👥 Tài Khoản Kiểm Thử Mẫu (Dev Seed)
Cơ sở dữ liệu đã được nạp sẵn dữ liệu mẫu sau khi chạy migration:

- **Tài khoản Quản trị viên (Admin):**
  - Email: `admin@cinerush.com`
  - Mật khẩu: `password123`
  - Quyền hạn: `ADMIN` (Điều hướng tới trang Admin `/admin`)
- **Tài khoản Khách hàng (Customer):**
  - Email: `customer@cinerush.com`
  - Mật khẩu: `password123`
  - Quyền hạn: `CUSTOMER` (Điều hướng tới trang chủ `/`)
- **Tài khoản Quản lý rạp (Cinema Manager):**
  - Email: `manager@cinerush.com`
  - Mật khẩu: `password123`
  - Quyền hạn: `CINEMA_MANAGER` (Điều hướng tới trang Admin `/admin`)
- **Tài khoản Nhân viên soát vé (Ticket Checker):**
  - Email: `checker@cinerush.com`
  - Mật khẩu: `password123`
  - Quyền hạn: `TICKET_CHECKER` (Điều hướng tới trang So soát vé `/staff/ticket-check`)

---

## 🚦 Quy Tắc Làm Việc Nhánh và Commit (Git Workflow)

### 1. Quy tắc đặt tên nhánh (Branching Guidelines)
Tên nhánh được đặt theo định dạng chuẩn để dễ theo dõi tiến độ:
- Nhánh tính năng mới: `feature/ten-tinh-nang` hoặc đặt theo tên cá nhân phát triển, ví dụ: `duc`, `bach`.
- Nhánh sửa lỗi: `bugfix/ten-loi-can-sua`.
- Nhánh cấu hình hệ thống: `chore/ten-cau-hinh`.

### 2. Định dạng thông điệp Commit (Conventional Commits)
Sử dụng các tiền tố sau khi viết commit message để tự động hóa nhật ký thay đổi:
- `feat`: Tính năng mới (ví dụ: `feat: add booking api flow`)
- `fix`: Sửa lỗi (ví dụ: `fix: resolve nullpointer in global error handler`)
- `chore`: Thay đổi hệ thống build, cập nhật file cấu hình (ví dụ: `chore: update env.example for redis`)
- `docs`: Cập nhật tài liệu (ví dụ: `docs: update readme with docker guide`)

> [!WARNING]
> **Tuyệt đối không commit các file cấu hình `.env` thật, thông tin mật khẩu cá nhân, khóa bí mật JWT, API key lên GitHub.** Mọi thông tin nhạy cảm phải được bảo vệ trong các file `.env` được bỏ qua bởi `.gitignore`.
