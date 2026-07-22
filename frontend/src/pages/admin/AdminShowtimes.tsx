import React from 'react';
import { Plus, Clock } from 'lucide-react';

import { mockShowtimes } from '../../mocks';

const AdminShowtimes: React.FC = () => {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Quản lý Suất chiếu</h1>
          <p className="page-description">Lên lịch chiếu phim, phân bổ phòng chiếu, cài đặt giá vé cơ bản và mở đặt vé.</p>
        </div>
        <button className="btn-primary">
          <Plus size={16} />
          Tạo suất chiếu mới
        </button>
      </div>

      <div className="admin-card">
        <div className="search-filter-bar">
          <input type="date" className="input-search" defaultValue="2026-07-21" style={{ minWidth: 180 }} />
          
          <select className="select-filter">
            <option value="">-- Tất cả cụm rạp --</option>
            <option value="1">Cinerush Landmark 81</option>
            <option value="2">Cinerush Vincom Bà Triệu</option>
          </select>

          <select className="select-filter">
            <option value="">-- Tất cả trạng thái --</option>
            <option value="OPEN">OPEN (Đang mở bán)</option>
            <option value="DRAFT">DRAFT (Nháp)</option>
            <option value="CLOSED">CLOSED (Đóng đặt vé)</option>
            <option value="CANCELLED">CANCELLED (Hủy suất)</option>
          </select>
        </div>

        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Phim & Phiên bản</th>
                <th>Cụm rạp & Phòng</th>
                <th>Giờ chiếu</th>
                <th>Giá vé gốc (base_price)</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {mockShowtimes.map((st) => (
                <tr key={st.id}>
                  <td><strong>#{st.id}</strong></td>
                  <td>
                    <div style={{ fontWeight: 600, color: '#0f172a' }}>{st.movieTitle}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{st.movieVersion}</div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 500 }}>{st.cinemaName}</div>
                    <div style={{ fontSize: '0.8rem', color: '#0284c7' }}>{st.roomName}</div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontWeight: 600, color: '#d31d28' }}>
                      <Clock size={14} /> {st.startTime}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Kết thúc: {st.endTime}</div>
                  </td>
                  <td>
                    <strong style={{ color: '#059669' }}>{st.basePrice.toLocaleString('vi-VN')} ₫</strong>
                  </td>
                  <td>
                    <span className={`badge badge-${st.status.toLowerCase()}`}>
                      {st.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn-secondary" style={{ padding: '0.3rem 0.6rem' }}>Chỉnh sửa</button>
                      <button className="btn-secondary" style={{ padding: '0.3rem 0.6rem', color: '#b91c1c' }}>Hủy suất</button>
                    </div>
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

export default AdminShowtimes;
