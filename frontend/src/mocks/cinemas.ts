import type { Cinema } from '../types';

export const mockCinemas: Cinema[] = [
  {
    id: 1,
    code: 'CIN-CGV-LM81',
    name: 'Cinerush Landmark 81',
    slug: 'cinerush-landmark-81',
    address: '720A Điện Biên Phủ, Phường 22, Bình Thạnh, TP. Hồ Chí Minh',
    province: 'TP. Hồ Chí Minh',
    timezone: 'Asia/Ho_Chi_Minh',
    status: 'ACTIVE',
    createdAt: '2026-07-20T10:00:00Z',
    updatedAt: '2026-07-20T10:00:00Z',
    rooms: [
      { id: 101, cinemaId: 1, code: 'R01', name: 'Phòng 01 (IMAX)', roomType: 'IMAX', totalSeats: 180, cleaningBufferMinutes: 15, status: 'ACTIVE', createdAt: '2026-07-20T10:00:00Z', updatedAt: '2026-07-20T10:00:00Z' },
      { id: 102, cinemaId: 1, code: 'R02', name: 'Phòng 02 (4DX)', roomType: 'FOUR_DX', totalSeats: 120, cleaningBufferMinutes: 15, status: 'ACTIVE', createdAt: '2026-07-20T10:00:00Z', updatedAt: '2026-07-20T10:00:00Z' },
      { id: 103, cinemaId: 1, code: 'R03', name: 'Phòng 03 (Standard)', roomType: 'STANDARD', totalSeats: 150, cleaningBufferMinutes: 15, status: 'MAINTENANCE', createdAt: '2026-07-20T10:00:00Z', updatedAt: '2026-07-20T10:00:00Z' }
    ]
  },
  {
    id: 2,
    code: 'CIN-HANOI-ST',
    name: 'Cinerush Vincom Bà Triệu',
    slug: 'cinerush-vincom-ba-trieu',
    address: '191 Bà Triệu, Lê Đại Hành, Hai Bà Trưng, Hà Nội',
    province: 'Hà Nội',
    timezone: 'Asia/Ho_Chi_Minh',
    status: 'ACTIVE',
    createdAt: '2026-07-20T10:00:00Z',
    updatedAt: '2026-07-20T10:00:00Z',
    rooms: [
      { id: 201, cinemaId: 2, code: 'R01', name: 'Phòng 01 Standard', roomType: 'STANDARD', totalSeats: 160, cleaningBufferMinutes: 15, status: 'ACTIVE', createdAt: '2026-07-20T10:00:00Z', updatedAt: '2026-07-20T10:00:00Z' },
      { id: 202, cinemaId: 2, code: 'R02', name: 'Phòng 02 ScreenX', roomType: 'SCREEN_X', totalSeats: 140, cleaningBufferMinutes: 15, status: 'ACTIVE', createdAt: '2026-07-20T10:00:00Z', updatedAt: '2026-07-20T10:00:00Z' }
    ]
  }
];
