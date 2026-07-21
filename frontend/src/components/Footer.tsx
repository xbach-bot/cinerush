import './Footer.css';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-columns">
          <div className="footer-col">
            <h4>MUA VÉ XEM PHIM</h4>
            <ul>
              <li>Lịch chiếu phim</li>
              <li>Rạp chiếu phim</li>
              <li>Phim chiếu rạp</li>
              <li>Review phim</li>
              <li>Top phim</li>
              <li>Blog phim</li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>DỊCH VỤ NỔI BẬT</h4>
            <ul>
              <li>Ưu đãi thành viên</li>
              <li>Thẻ quà tặng</li>
              <li>Tuyển dụng</li>
              <li>Liên hệ đối tác</li>
            </ul>
          </div>
          <div className="footer-col contact-col">
            <h4>CHĂM SÓC KHÁCH HÀNG</h4>
            <p>Hồ Chí Minh: Tầng 5, Tòa nhà CineRush, Quận 1</p>
            <p>Hà Nội: Tầng 3, Tòa nhà CineRush, Cầu Giấy</p>
            <p>Thời gian làm việc:<br/>Thứ 2 - Chủ Nhật (8:00 - 23:00)</p>
            <p>Hotline: 1900 1234 56</p>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="company-info">
            <div className="footer-logo"><Logo height={50} /></div>
            <div>
              <p>CÔNG TY CỔ PHẦN GIẢI TRÍ CINERUSH</p>
              <p>Trụ sở chính: Tầng 5, Tòa nhà CineRush, Phường Bến Nghé, Quận 1, TP. HCM</p>
              <p>©Copyright CineRush 2026</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
