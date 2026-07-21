import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { LogOut, Film } from 'lucide-react';
import './admin/AdminLayout.css';

const StaffLayout: React.FC = () => {
  return (
    <div className="admin-layout-container" style={{ flexDirection: 'column', backgroundColor: '#f8fafc' }}>
      <header className="admin-topbar" style={{ backgroundColor: '#0f172a', color: '#ffffff', borderBottom: 'none' }}>
        <div className="topbar-left">
          <div className="sidebar-brand-logo" style={{ width: 34, height: 34 }}>
            <Film size={18} />
          </div>
          <span className="topbar-title" style={{ color: '#ffffff', fontWeight: 600 }}>
            Cinerush Staff Portal - Soát Vé Cụm Rạp
          </span>
        </div>

        <div className="topbar-right">
          <div className="topbar-user-badge">
            <div className="user-avatar" style={{ backgroundColor: '#0284c7' }}>ST</div>
            <div className="user-info">
              <span className="user-name" style={{ color: '#ffffff' }}>Nhân viên Soát vé</span>
              <span className="user-role-badge" style={{ backgroundColor: '#38bdf8', color: '#0f172a' }}>TICKET_CHECKER</span>
            </div>
          </div>

          <Link to="/login" className="btn-secondary" style={{ backgroundColor: '#1e293b', color: '#f8fafc', borderColor: '#334155' }}>
            <LogOut size={16} />
            Đăng xuất
          </Link>
        </div>
      </header>

      <main className="admin-page-content" style={{ maxWidth: '1000px', width: '100%', margin: '0 auto' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default StaffLayout;
