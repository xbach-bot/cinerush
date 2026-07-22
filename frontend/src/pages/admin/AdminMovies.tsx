import React, { useState } from 'react';
import { Plus, Search, Edit3, Eye, Star } from 'lucide-react';

import { mockMovies } from '../../mocks';

const AdminMovies: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Quản lý Phim</h1>
          <p className="page-description">Quản lý danh sách phim, thông tin khởi chiếu, phân loại độ tuổi và trạng thái hiển thị.</p>
        </div>
        <button className="btn-primary">
          <Plus size={16} />
          Thêm phim mới
        </button>
      </div>

      <div className="admin-card">
        <div className="search-filter-bar">
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={16} style={{ position: 'absolute', left: 12, top: 11, color: '#94a3b8' }} />
            <input 
              type="text" 
              className="input-search" 
              placeholder="Tìm kiếm theo tên phim hoặc slug..."
              style={{ paddingLeft: 36, width: '100%' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select 
            className="select-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">-- Tất cả trạng thái --</option>
            <option value="NOW_SHOWING">NOW_SHOWING (Đang chiếu)</option>
            <option value="COMING_SOON">COMING_SOON (Sắp chiếu)</option>
            <option value="DRAFT">DRAFT (Bản nháp)</option>
            <option value="STOPPED">STOPPED (Ngừng chiếu)</option>
          </select>
        </div>

        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên phim</th>
                <th>Slug</th>
                <th>Thời lượng</th>
                <th>Độ tuổi</th>
                <th>Ngày khởi chiếu</th>
                <th>Nổi bật</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {mockMovies.map((movie) => (
                <tr key={movie.id}>
                  <td><strong>#{movie.id}</strong></td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{movie.title}</div>
                  </td>
                  <td><code style={{ color: '#0284c7' }}>{movie.slug}</code></td>
                  <td>{movie.durationMinutes} phút</td>
                  <td><span className="badge" style={{ backgroundColor: '#f1f5f9', color: '#0f172a' }}>{movie.ageRating}</span></td>
                  <td>{movie.releaseDate}</td>
                  <td>
                    {movie.featured ? (
                      <span style={{ color: '#d97706', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Star size={14} fill="#d97706" /> Nổi bật
                      </span>
                    ) : (
                      <span style={{ color: '#94a3b8' }}>Thường</span>
                    )}
                  </td>
                  <td>
                    <span className={`badge badge-${movie.status.toLowerCase().replace('_', '-')}`}>
                      {movie.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn-secondary" style={{ padding: '0.3rem 0.6rem' }} title="Xem chi tiết">
                        <Eye size={14} />
                      </button>
                      <button className="btn-secondary" style={{ padding: '0.3rem 0.6rem' }} title="Sửa thông tin">
                        <Edit3 size={14} />
                      </button>
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

export default AdminMovies;
