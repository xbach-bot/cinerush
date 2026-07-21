import React from 'react';
import { Film, Clock, Ticket, DollarSign, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Tổng quan Dashboard</h1>
          <p className="page-description">Theo dõi KPI hoạt động kinh doanh, suất chiếu và doanh thu hôm nay.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link to="/admin/movies" className="btn-primary">
            <PlusCircle size={16} />
            Thêm phim mới
          </Link>
          <Link to="/admin/showtimes" className="btn-secondary">
            <Clock size={16} />
            Tạo suất chiếu
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-icon-wrapper kpi-icon-red">
            <Film size={24} />
          </div>
          <div className="kpi-content">
            <span className="kpi-label">Phim đang chiếu</span>
            <span className="kpi-value">12 phim</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-wrapper kpi-icon-blue">
            <Clock size={24} />
          </div>
          <div className="kpi-content">
            <span className="kpi-label">Suất chiếu hôm nay</span>
            <span className="kpi-value">48 suất</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-wrapper kpi-icon-amber">
            <Ticket size={24} />
          </div>
          <div className="kpi-content">
            <span className="kpi-label">Vé đã bán hôm nay</span>
            <span className="kpi-value">1,240 vé</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-wrapper kpi-icon-emerald">
            <DollarSign size={24} />
          </div>
          <div className="kpi-content">
            <span className="kpi-label">Doanh thu tạm tính</span>
            <span className="kpi-value">124.500.000 ₫</span>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="admin-card-title">Giao dịch Booking mới nhất</h2>
          <Link to="/admin/bookings" style={{ color: '#d31d28', fontSize: '0.875rem', fontWeight: 600 }}>
            Xem tất cả &rarr;
          </Link>
        </div>

        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Mã Booking</th>
                <th>Khách hàng</th>
                <th>Phim & Suất chiếu</th>
                <th>Ghế đặt</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
                <th>Thời gian</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>BK-884910</strong></td>
                <td>Nguyễn Văn A (customer1@gmail.com)</td>
                <td>Avatar 3 (Phòng 01 - 19:30)</td>
                <td>F07, F08</td>
                <td>240.000 ₫</td>
                <td><span className="badge badge-confirmed">CONFIRMED</span></td>
                <td>10:15:22 - 21/07/2026</td>
              </tr>
              <tr>
                <td><strong>BK-884909</strong></td>
                <td>Trần Thị B (customer2@gmail.com)</td>
                <td>Lật Mặt 7 (Phòng 03 - 20:00)</td>
                <td>H10, H11, H12</td>
                <td>330.000 ₫</td>
                <td><span className="badge badge-confirmed">CONFIRMED</span></td>
                <td>10:12:05 - 21/07/2026</td>
              </tr>
              <tr>
                <td><strong>BK-884908</strong></td>
                <td>Lê Hoàng C (customer3@gmail.com)</td>
                <td>Conan Movie 27 (Phòng 02 - 18:15)</td>
                <td>D04</td>
                <td>95.000 ₫</td>
                <td><span className="badge badge-pending">PENDING</span></td>
                <td>10:05:44 - 21/07/2026</td>
              </tr>
              <tr>
                <td><strong>BK-884907</strong></td>
                <td>Phạm Quốc D (customer4@gmail.com)</td>
                <td>Dune: Part Two (Phòng 01 - 21:15)</td>
                <td>G05, G06</td>
                <td>220.000 ₫</td>
                <td><span className="badge badge-cancelled">CANCELLED</span></td>
                <td>09:45:10 - 21/07/2026</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
