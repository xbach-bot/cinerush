import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Film, 
  Tag, 
  Building2, 
  Clock, 
  Users, 
  Ticket, 
  QrCode,
  Film as LogoIcon
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const adminNavItems = [
    { path: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={20} />, end: true },
    { path: '/admin/movies', label: 'Quản lý phim', icon: <Film size={20} /> },
    { path: '/admin/genres', label: 'Quản lý thể loại', icon: <Tag size={20} /> },
    { path: '/admin/cinemas', label: 'Quản lý rạp & phòng', icon: <Building2 size={20} /> },
    { path: '/admin/showtimes', label: 'Quản lý suất chiếu', icon: <Clock size={20} /> },
    { path: '/admin/users', label: 'Quản lý người dùng', icon: <Users size={20} /> },
    { path: '/admin/bookings', label: 'Quản lý booking', icon: <Ticket size={20} /> },
  ];

  const staffNavItems = [
    { path: '/staff/ticket-check', label: 'Soát vé (Staff)', icon: <QrCode size={20} /> },
  ];

  return (
    <aside className={`admin-sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-brand">
        <div className="sidebar-brand-logo">
          <LogoIcon size={22} />
        </div>
        {!collapsed && <span className="sidebar-brand-text">Cinerush Admin</span>}
      </div>

      <nav className="sidebar-menu">
        {!collapsed && <div className="sidebar-group-label">Quản trị hệ thống</div>}
        {adminNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            title={collapsed ? item.label : undefined}
          >
            <span className="sidebar-link-icon">{item.icon}</span>
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}

        <div style={{ margin: '1rem 0', borderTop: '1px solid #1e293b' }} />

        {!collapsed && <div className="sidebar-group-label">Khu vực Nhân viên</div>}
        {staffNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            title={collapsed ? item.label : undefined}
          >
            <span className="sidebar-link-icon">{item.icon}</span>
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
