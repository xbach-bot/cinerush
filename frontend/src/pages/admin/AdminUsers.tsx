import React from 'react';
import { Search, Shield, Lock, Unlock } from 'lucide-react';

import { mockUsers } from '../../mocks';

const AdminUsers: React.FC = () => {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Quản lý Người dùng & Phân quyền</h1>
          <p className="page-description">Tìm kiếm người dùng, khóa/mở khóa tài khoản và gán vai trò hệ thống.</p>
        </div>
      </div>

      <div className="admin-card">
        <div className="search-filter-bar">
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={16} style={{ position: 'absolute', left: 12, top: 11, color: '#94a3b8' }} />
            <input 
              type="text" 
              className="input-search" 
              placeholder="Tìm kiếm theo email, họ tên, số điện thoại..."
              style={{ paddingLeft: 36, width: '100%' }}
            />
          </div>

          <select className="select-filter">
            <option value="">-- Tất cả vai trò --</option>
            <option value="ADMIN">ADMIN (Người quản trị)</option>
            <option value="CINEMA_MANAGER">CINEMA_MANAGER (Quản lý rạp)</option>
            <option value="TICKET_CHECKER">TICKET_CHECKER (Soát vé)</option>
            <option value="CUSTOMER">CUSTOMER (Khách hàng)</option>
          </select>
        </div>

        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Họ tên & Email</th>
                <th>Số điện thoại</th>
                <th>Vai trò (Roles)</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map((user) => (
                <tr key={user.id}>
                  <td><strong>#{user.id}</strong></td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{user.fullName}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{user.email}</div>
                  </td>
                  <td>{user.phone || 'N/A'}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                      {user.roles.map((r) => (
                        <span key={r} className="badge" style={{ backgroundColor: '#e0f2fe', color: '#0369a1' }}>
                          {r}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${user.status === 'ACTIVE' ? 'badge-active' : 'badge-locked'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn-secondary" style={{ padding: '0.3rem 0.6rem' }} title="Gán Role">
                        <Shield size={14} /> Gán role
                      </button>
                      {user.status === 'ACTIVE' ? (
                        <button className="btn-secondary" style={{ padding: '0.3rem 0.6rem', color: '#b91c1c' }} title="Khóa TK">
                          <Lock size={14} /> Khóa
                        </button>
                      ) : (
                        <button className="btn-secondary" style={{ padding: '0.3rem 0.6rem', color: '#047857' }} title="Mở khóa TK">
                          <Unlock size={14} /> Mở khóa
                        </button>
                      )}
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

export default AdminUsers;
