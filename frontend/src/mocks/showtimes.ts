import type { Showtime } from '../types';

export const mockShowtimes: Showtime[] = [
  {
    id: 1,
    movieTitle: 'Avatar: Fire and Ash',
    movieVersion: '3D Phụ đề Việt',
    cinemaName: 'Cinerush Landmark 81',
    roomName: 'Phòng 01 (IMAX)',
    startTime: '2026-07-21 19:30',
    endTime: '2026-07-21 22:40',
    basePrice: 120000,
    status: 'OPEN'
  },
  {
    id: 2,
    movieTitle: 'Lật Mặt 8: Đam Mê',
    movieVersion: '2D Lồng tiếng',
    cinemaName: 'Cinerush Landmark 81',
    roomName: 'Phòng 02 (4DX)',
    startTime: '2026-07-21 20:00',
    endTime: '2026-07-21 22:05',
    basePrice: 110000,
    status: 'OPEN'
  },
  {
    id: 3,
    movieTitle: 'Detective Conan: Movie 28',
    movieVersion: '2D Phụ đề',
    cinemaName: 'Cinerush Vincom Bà Triệu',
    roomName: 'Phòng 01',
    startTime: '2026-07-22 18:15',
    endTime: '2026-07-22 20:05',
    basePrice: 95000,
    status: 'DRAFT'
  }
];
