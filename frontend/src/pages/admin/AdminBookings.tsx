import React from 'react';
import { Search, Eye } from 'lucide-react';

import { mockBookings } from '../../mocks';

const AdminBookings: React.FC = () => {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Quản lý Booking & Vé</h1>
          <p className="page-description">Theo dõi tất cả giao dịch đặt vé, trạng thái thanh toán và chi tiết vé điện tử.</p>
        </div>
      </div>

      <div className="admin-card">
        <div className="search-filter-bar">
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={16} style={{ position: 'absolute', left: 12, top: 11, color: '#94a3b8' }} />
            <input 
              type="text" 
              className="input-search" 
              placeholder="Tìm theo Mã Booking (BK-xxx), tên khách hàng..."
              style={{ paddingLeft: 36, width: '100%' }}
            />
          </div>

          <select className="select-filter">
            <option value="">-- Trạng thái booking --</option>
            <option value="CONFIRMED">CONFIRMED (Thành công)</option>
            <option value="PENDING">PENDING (Chờ thanh toán)</option>
            <option value="EXPIRED">EXPIRED (Hết hạn)</option>
            <option value="CANCELLED">CANCELLED (Đã hủy)</option>
          </select>
        </div>

        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Mã Booking</th>
                <th>Khách hàng</th>
                <th>Phim & Rạp</th>
                <th>Suất chiếu & Ghế</th>
                <th>Tổng tiền</th>
                <th>Phương thức</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {mockBookings.map((b) => (
                <tr key={b.id}>
                  <td><strong style={{ color: '#d31d28' }}>{b.bookingCode}</strong></td>
                  <td>{b.customerName}</td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{b.movieTitle}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{b.cinemaName}</div>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.85rem', fontWeight: 500 }}>{b.showtime}</div>
                    <div style={{ fontSize: '0.8rem', color: '#0284c7' }}>Ghế: <strong>{b.seats}</strong></div>
                  </td>
                  <td><strong style={{ color: '#059669' }}>{b.totalAmount.toLocaleString('vi-VN')} ₫</strong></td>
                  <td><span className="badge" style={{ backgroundColor: '#f1f5f9', color: '#334155' }}>{b.paymentMethod}</span></td>
                  <td>
                    <span className={`badge badge-${b.status.toLowerCase()}`}>
                      {b.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn-secondary" style={{ padding: '0.3rem 0.6rem' }}>
                      <Eye size={14} /> Xem vé
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminBookings;
