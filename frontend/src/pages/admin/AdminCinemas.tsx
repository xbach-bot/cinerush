import React from 'react';
import { Building2, Plus, Edit3, MapPin, Layers } from 'lucide-react';

interface RoomMock {
  id: number;
  code: string;
  name: string;
  roomType: string;
  totalSeats: number;
  status: 'ACTIVE' | 'MAINTENANCE';
}

interface CinemaMock {
  id: number;
  code: string;
  name: string;
  address: string;
  province: string;
  status: 'ACTIVE' | 'INACTIVE';
  rooms: RoomMock[];
}

const mockCinemas: CinemaMock[] = [
  {
    id: 1,
    code: 'CIN-CGV-LM81',
    name: 'Cinerush Landmark 81',
    address: '720A Điện Biên Phủ, Phường 22, Bình Thạnh, TP. Hồ Chí Minh',
    province: 'TP. Hồ Chí Minh',
    status: 'ACTIVE',
    rooms: [
      { id: 101, code: 'R01', name: 'Phòng 01 (IMAX)', roomType: 'IMAX', totalSeats: 180, status: 'ACTIVE' },
      { id: 102, code: 'R02', name: 'Phòng 02 (4DX)', roomType: 'FOUR_DX', totalSeats: 120, status: 'ACTIVE' },
      { id: 103, code: 'R03', name: 'Phòng 03 (Standard)', roomType: 'STANDARD', totalSeats: 150, status: 'MAINTENANCE' },
    ]
  },
  {
    id: 2,
    code: 'CIN-HANOI-ST',
    name: 'Cinerush Vincom Bà Triệu',
    address: '191 Bà Triệu, Lê Đại Hành, Hai Bà Trưng, Hà Nội',
    province: 'Hà Nội',
    status: 'ACTIVE',
    rooms: [
      { id: 201, code: 'R01', name: 'Phòng 01 Standard', roomType: 'STANDARD', totalSeats: 160, status: 'ACTIVE' },
      { id: 202, code: 'R02', name: 'Phòng 02 ScreenX', roomType: 'SCREEN_X', totalSeats: 140, status: 'ACTIVE' },
    ]
  }
];

const AdminCinemas: React.FC = () => {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Quản lý Rạp & Phòng chiếu</h1>
          <p className="page-description">Quản lý danh sách các cụm rạp, địa chỉ, phòng chiếu và sơ đồ ghế.</p>
        </div>
        <button className="btn-primary">
          <Plus size={16} />
          Tạo rạp chiếu mới
        </button>
      </div>

      {mockCinemas.map((cinema) => (
        <div className="admin-card" key={cinema.id} style={{ marginBottom: '1.5rem' }}>
          <div className="admin-card-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div className="kpi-icon-wrapper kpi-icon-red" style={{ width: 40, height: 40 }}>
                <Building2 size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>
                  {cinema.name} <code style={{ fontSize: '0.85rem', color: '#0284c7' }}>({cinema.code})</code>
                </h3>
                <div style={{ fontSize: '0.85rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                  <MapPin size={14} /> {cinema.address}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span className={`badge ${cinema.status === 'ACTIVE' ? 'badge-active' : 'badge-stopped'}`}>
                {cinema.status}
              </span>
              <button className="btn-secondary" style={{ padding: '0.4rem 0.75rem' }}>
                <Edit3 size={14} /> Sửa rạp
              </button>
            </div>
          </div>

          <div style={{ marginTop: '1rem', borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#334155', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Layers size={16} /> Danh sách phòng chiếu ({cinema.rooms.length} phòng)
              </h4>
              <button className="btn-secondary" style={{ padding: '0.35rem 0.65rem', fontSize: '0.8rem' }}>
                <Plus size={14} /> Thêm phòng chiếu
              </button>
            </div>

            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Mã phòng</th>
                    <th>Tên phòng</th>
                    <th>Loại phòng (RoomType)</th>
                    <th>Tổng số ghế</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {cinema.rooms.map((room) => (
                    <tr key={room.id}>
                      <td><strong>{room.code}</strong></td>
                      <td>{room.name}</td>
                      <td><span className="badge" style={{ backgroundColor: '#e0f2fe', color: '#0369a1' }}>{room.roomType}</span></td>
                      <td>{room.totalSeats} ghế</td>
                      <td>
                        <span className={`badge ${room.status === 'ACTIVE' ? 'badge-active' : 'badge-draft'}`}>
                          {room.status}
                        </span>
                      </td>
                      <td>
                        <button className="btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}>
                          Quản lý sơ đồ ghế
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminCinemas;
