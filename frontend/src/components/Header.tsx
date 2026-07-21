import { Link } from 'react-router-dom';
import './Header.css';
import Logo from './Logo';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo-section">
          <Logo />
        </Link>
        <nav className="nav-links">
          <Link to="/">Lịch chiếu</Link>
          <Link to="/">Rạp chiếu</Link>
          <Link to="/movies">Phim chiếu</Link>
          <Link to="/">Review phim</Link>
          <Link to="/">Top phim</Link>
          <Link to="/">Blog phim</Link>
        </nav>
        <div className="header-actions">
          <div className="search-icon">🔍</div>
          <Link to="/login" className="login-btn">Đăng nhập</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
