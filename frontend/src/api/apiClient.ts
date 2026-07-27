import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Tự động gắn token JWT vào Header Authorization nếu tồn tại trong localStorage
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Tự động xử lý lỗi hệ thống, ví dụ lỗi 401 (Chưa xác thực) và 403 (Không có quyền)
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        // Hết hạn hoặc sai token, xóa token và chuyển hướng về đăng nhập
        console.warn('Phiên làm việc hết hạn hoặc chưa đăng nhập. Đang xóa token...');
        localStorage.removeItem('token');
        // Bạn có thể xử lý redirect đến màn hình login tại đây
        // window.location.href = '/login';
      } else if (status === 403) {
        console.error('Tài khoản của bạn không có quyền truy cập chức năng này.');
      }
    }
    return Promise.reject(error);
  }
);

export { apiClient };
export default apiClient;
