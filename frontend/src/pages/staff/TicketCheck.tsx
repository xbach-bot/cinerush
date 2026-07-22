import React, { useState } from 'react';
import { QrCode, CheckCircle, XCircle, AlertTriangle, Search } from 'lucide-react';

import type { ScanResult } from '../../types';

const TicketCheck: React.FC = () => {
  const [qrInput, setQrInput] = useState('');
  const [lastResult, setLastResult] = useState<ScanResult | null>(null);

  const handleSimulateScan = (status: 'VALID' | 'ALREADY_USED' | 'INVALID') => {
    if (status === 'VALID') {
      setLastResult({
        status: 'VALID',
        ticketCode: 'TK-884910-01',
        movieTitle: 'Avatar: Fire and Ash (3D Phụ đề)',
        cinemaName: 'Cinerush Landmark 81',
        roomName: 'Phòng 01 (IMAX)',
        seatCode: 'F07',
        showtime: '19:30 - 21/07/2026',
        customerName: 'Nguyễn Văn A'
      });
    } else if (status === 'ALREADY_USED') {
      setLastResult({
        status: 'ALREADY_USED',
        ticketCode: 'TK-884910-02',
        movieTitle: 'Avatar: Fire and Ash (3D Phụ đề)',
        cinemaName: 'Cinerush Landmark 81',
        roomName: 'Phòng 01 (IMAX)',
        seatCode: 'F08',
        showtime: '19:30 - 21/07/2026',
        customerName: 'Nguyễn Văn A',
        usedAt: '19:15:00 - 21/07/2026'
      });
    } else {
      setLastResult({
        status: 'INVALID',
        ticketCode: qrInput || 'QR-UNKNOWN-TOKEN'
      });
    }
  };

  return (
    <div style={{ padding: '1rem 0' }}>
      <div className="page-header" style={{ marginBottom: '1rem' }}>
        <div>
          <h1 className="page-title">Hệ thống Soát vé Cinerush</h1>
          <p className="page-description">Quét mã QR trên vé điện tử hoặc nhập mã token để kiểm tra tính hợp lệ và cho khách vào phòng chiếu.</p>
        </div>
      </div>

      <div className="admin-card" style={{ maxWidth: '650px', margin: '0 auto 1.5rem auto' }}>
        <h3 className="admin-card-title" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
          <QrCode size={20} color="#d31d28" />
          Nhập mã vé / Quét QR Token
        </h3>

        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <input 
            type="text" 
            className="input-search" 
            placeholder="Nhập mã vé hoặc mã QR token..." 
            style={{ flex: 1 }}
            value={qrInput}
            onChange={(e) => setQrInput(e.target.value)}
          />
          <button 
            className="btn-primary" 
            onClick={() => handleSimulateScan(qrInput.includes('USED') ? 'ALREADY_USED' : qrInput.includes('ERR') ? 'INVALID' : 'VALID')}
          >
            <Search size={16} /> Kiểm tra vé
          </button>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
          <span style={{ fontSize: '0.8rem', color: '#64748b', alignSelf: 'center', marginRight: '0.5rem' }}>
            Giả lập nhanh quét QR:
          </span>
          <button className="btn-secondary" style={{ fontSize: '0.8rem' }} onClick={() => handleSimulateScan('VALID')}>
            ✅ Mã Hợp Lệ (VALID)
          </button>
          <button className="btn-secondary" style={{ fontSize: '0.8rem' }} onClick={() => handleSimulateScan('ALREADY_USED')}>
            ⚠️ Vé Đã Dùng (USED)
          </button>
          <button className="btn-secondary" style={{ fontSize: '0.8rem' }} onClick={() => handleSimulateScan('INVALID')}>
            ❌ Mã Không Hợp Lệ
          </button>
        </div>
      </div>

      {/* Result Display */}
      {lastResult && (
        <div className="admin-card" style={{ maxWidth: '650px', margin: '0 auto', textAlign: 'center', borderTop: lastResult.status === 'VALID' ? '4px solid #059669' : lastResult.status === 'ALREADY_USED' ? '4px solid #d97706' : '4px solid #dc2626' }}>
          {lastResult.status === 'VALID' && (
            <div>
              <div style={{ color: '#059669', marginBottom: '0.5rem' }}>
                <CheckCircle size={48} style={{ margin: '0 auto' }} />
              </div>
              <h2 style={{ fontSize: '1.4rem', color: '#059669', fontWeight: 700 }}>VÉ HỢP LỆ (VALID)</h2>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1rem' }}>Xác nhận khách hàng được phép vào phòng chiếu.</p>

              <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: 8, textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div><strong>Phim:</strong> {lastResult.movieTitle}</div>
                <div><strong>Rạp & Phòng:</strong> {lastResult.cinemaName} - <strong>{lastResult.roomName}</strong></div>
                <div><strong>Suất chiếu:</strong> {lastResult.showtime}</div>
                <div><strong>Số Ghế:</strong> <span style={{ fontSize: '1.2rem', color: '#d31d28', fontWeight: 700 }}>{lastResult.seatCode}</span></div>
                <div><strong>Mã vé:</strong> <code>{lastResult.ticketCode}</code></div>
                <div><strong>Khách hàng:</strong> {lastResult.customerName}</div>
              </div>
            </div>
          )}

          {lastResult.status === 'ALREADY_USED' && (
            <div>
              <div style={{ color: '#d97706', marginBottom: '0.5rem' }}>
                <AlertTriangle size={48} style={{ margin: '0 auto' }} />
              </div>
              <h2 style={{ fontSize: '1.4rem', color: '#d97706', fontWeight: 700 }}>VÉ ĐÃ ĐƯỢC SỬ DỤNG (ALREADY USED)</h2>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1rem' }}>Vé này đã được thực hiện soát vé trước đó.</p>

              <div style={{ backgroundColor: '#fffbeb', padding: '1rem', borderRadius: 8, textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div><strong>Số Ghế:</strong> <span style={{ fontSize: '1.2rem', color: '#d97706', fontWeight: 700 }}>{lastResult.seatCode}</span></div>
                <div><strong>Phòng:</strong> {lastResult.roomName}</div>
                <div><strong>Thời điểm đã soát:</strong> {lastResult.usedAt}</div>
              </div>
            </div>
          )}

          {lastResult.status === 'INVALID' && (
            <div>
              <div style={{ color: '#dc2626', marginBottom: '0.5rem' }}>
                <XCircle size={48} style={{ margin: '0 auto' }} />
              </div>
              <h2 style={{ fontSize: '1.4rem', color: '#dc2626', fontWeight: 700 }}>MÃ VÉ KHÔNG HỢP LỆ (INVALID)</h2>
              <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Mã QR hoặc token vé không tồn tại trên hệ thống hoặc đã bị hủy.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TicketCheck;
