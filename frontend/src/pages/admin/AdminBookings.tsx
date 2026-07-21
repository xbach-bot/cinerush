import React from 'react';
import { Search, Eye } from 'lucide-react';

interface BookingMock {
  id: number;
  bookingCode: string;
  customerName: string;
  movieTitle: string;
  cinemaName: string;
  showtime: string;
  seats: string;
  totalAmount: number;
  paymentMethod: string;
  status: 'CONFIRMED' | 'PENDING' | 'CANCELLED' | 'EXPIRED';
  createdAt: string;
}

const mockBookings: BookingMock[] = [
  { id: 1, bookingCode: 'BK-884910', customerName: 'Nguyễn Văn A', movieTitle: 'Avatar: Fire and Ash', cinemaName: 'Cinerush Landmark 81', showtime: '19:30 - 21/07/2026', seats: 'F07, F08', totalAmount: 240000, paymentMethod: 'MOMO', status: 'CONFIRMED', createdAt: '2026-07-21 10:15' },
  { id: 2, bookingCode: 'BK-884909', customerName: 'Trần Thị B', movieTitle: 'Lật Mặt 8: Đam Mê', cinemaName: 'Cinerush Landmark 81', showtime: '20:00 - 21/07/2026', seats: 'H10, H11', totalAmount: 220000, paymentMethod: 'VNPAY', status: 'CONFIRMED', createdAt: '2026-07-21 10:12' },
  { id: 3, bookingCode: 'BK-884908', customerName: 'Lê Hoàng C', movieTitle: 'Detective Conan 28', cinemaName: 'Cinerush Vincom Bà Triệu', showtime: '18:15 - 22/07/2026', seats: 'D04', totalAmount: 95000, paymentMethod: 'MOCK', status: 'PENDING', createdAt: '2026-07-21 10:05' },
  { id: 4, bookingCode: 'BK-884907', customerName: 'Phạm Quốc D', movieTitle: 'Dune: Part Two', cinemaName: 'Cinerush Landmark 81', showtime: '21:15 - 21/07/2026', seats: 'G05, G06', totalAmount: 220000, paymentMethod: 'MOCK', status: 'EXPIRED', createdAt: '2026-07-21 09:45' },
];

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
