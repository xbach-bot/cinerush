import React from 'react';
import { Menu, Bell, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TopbarProps {
  toggleSidebar: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ toggleSidebar }) => {
  return (
    <header className="admin-topbar">
      <div className="topbar-left">
        <button 
          className="toggle-sidebar-btn" 
          onClick={toggleSidebar}
          title="Ẩn/Hiện Menu Sidebar"
        >
          <Menu size={20} />
        </button>
        <span className="topbar-title">Hệ thống Quản trị & Điều hành Cinerush</span>
      </div>

      <div className="topbar-right">
        <Link 
          to="/" 
          target="_blank" 
          className="btn-secondary"
          style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}
          title="Mở trang chủ khách hàng"
        >
          <ExternalLink size={14} />
          Trang khách hàng
        </Link>

        <div style={{ position: 'relative', cursor: 'pointer', color: '#64748b' }}>
          <Bell size={20} />
          <span 
            style={{
              position: 'absolute',
              top: -4,
              right: -4,
              width: 8,
              height: 8,
              backgroundColor: '#d31d28',
              borderRadius: '50%'
            }}
          />
        </div>

        <div className="topbar-user-badge">
          <div className="user-avatar">AD</div>
          <div className="user-info">
            <span className="user-name">Đào Đức (Admin)</span>
            <span className="user-role-badge">ADMIN</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
