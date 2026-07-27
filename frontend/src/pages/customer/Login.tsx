import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Kiểm tra mật khẩu mẫu
    if (password !== 'password123') {
      setError('Mật khẩu không chính xác (mặc định là password123)');
      return;
    }

    // Phân quyền điều hướng theo vai trò (Role-based redirection)
    if (email === 'admin@cinerush.com') {
      localStorage.setItem('token', 'mock-jwt-admin-token');
      localStorage.setItem('role', 'ADMIN');
      navigate('/admin');
    } else if (email === 'customer@cinerush.com') {
      localStorage.setItem('token', 'mock-jwt-customer-token');
      localStorage.setItem('role', 'CUSTOMER');
      navigate('/');
    } else if (email === 'manager@cinerush.com') {
      localStorage.setItem('token', 'mock-jwt-manager-token');
      localStorage.setItem('role', 'CINEMA_MANAGER');
      navigate('/admin');
    } else if (email === 'checker@cinerush.com') {
      localStorage.setItem('token', 'mock-jwt-checker-token');
      localStorage.setItem('role', 'TICKET_CHECKER');
      navigate('/staff/ticket-check');
    } else {
      setError('Tài khoản không tồn tại hoặc thông tin đăng nhập sai.');
    }
  };

  const quickLogin = (roleEmail: string) => {
    setEmail(roleEmail);
    setPassword('password123');
    setError('');
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-950 text-white p-4">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl border border-gray-800 shadow-2xl p-8 backdrop-blur-md bg-opacity-95">
        <h2 className="text-3xl font-extrabold text-center mb-2 tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500">
          CINERUSH
        </h2>
        <p className="text-center text-gray-400 mb-8 text-sm">Chào mừng bạn quay trở lại</p>

        {error && (
          <div className="bg-red-500 bg-opacity-15 border border-red-500 border-opacity-50 text-red-400 text-sm rounded-xl p-3 mb-6 text-center">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
              Email đăng nhập
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-sm transition-all duration-200"
              placeholder="example@cinerush.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
              Mật khẩu
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-sm transition-all duration-200"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 font-bold rounded-xl shadow-lg transition-all duration-300 transform active:scale-[0.98] text-sm uppercase tracking-wider"
          >
            Đăng Nhập
          </button>
        </form>

        <div className="mt-8 border-t border-gray-850 pt-6">
          <p className="text-center text-xs text-gray-500 mb-4 uppercase tracking-widest font-bold">
            Đăng nhập nhanh để test (Quick Fill)
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => quickLogin('admin@cinerush.com')}
              className="px-3 py-2.5 text-xs bg-gray-950 border border-gray-800 hover:bg-gray-800 rounded-xl transition-colors font-semibold text-red-400 hover:text-red-300"
            >
              👑 Admin
            </button>
            <button
              onClick={() => quickLogin('customer@cinerush.com')}
              className="px-3 py-2.5 text-xs bg-gray-950 border border-gray-800 hover:bg-gray-800 rounded-xl transition-colors font-semibold text-green-400 hover:text-green-300"
            >
              🎫 Customer
            </button>
            <button
              onClick={() => quickLogin('manager@cinerush.com')}
              className="px-3 py-2.5 text-xs bg-gray-950 border border-gray-800 hover:bg-gray-800 rounded-xl transition-colors font-semibold text-amber-400 hover:text-amber-300"
            >
              🎬 Manager
            </button>
            <button
              onClick={() => quickLogin('checker@cinerush.com')}
              className="px-3 py-2.5 text-xs bg-gray-950 border border-gray-800 hover:bg-gray-800 rounded-xl transition-colors font-semibold text-blue-400 hover:text-blue-300"
            >
              🔍 Checker
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
