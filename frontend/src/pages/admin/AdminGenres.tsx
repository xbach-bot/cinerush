import React from 'react';
import { Plus, Edit3, Tag } from 'lucide-react';

import { mockGenres } from '../../mocks';

const AdminGenres: React.FC = () => {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Quản lý Thể loại Phim</h1>
          <p className="page-description">Danh mục thể loại phim dùng để phân loại trên trang chủ và danh sách xem phim.</p>
        </div>
        <button className="btn-primary">
          <Plus size={16} />
          Thêm thể loại mới
        </button>
      </div>

      <div className="admin-card">
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên thể loại</th>
                <th>Slug</th>
                <th>Mô tả</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {mockGenres.map((genre) => (
                <tr key={genre.id}>
                  <td><strong>#{genre.id}</strong></td>
                  <td>
                    <div style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Tag size={14} color="#d31d28" />
                      {genre.name}
                    </div>
                  </td>
                  <td><code>{genre.slug}</code></td>
                  <td>{genre.description}</td>
                  <td>
                    <span className={`badge ${genre.active ? 'badge-active' : 'badge-stopped'}`}>
                      {genre.active ? 'ACTIVE' : 'INACTIVE'}
                    </span>
                  </td>
                  <td>
                    <button className="btn-secondary" style={{ padding: '0.3rem 0.6rem' }}>
                      <Edit3 size={14} />
                      Sửa
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

export default AdminGenres;
