import type { User } from '../types';

export const mockUsers: User[] = [
  {
    id: 1,
    email: 'admin@cinerush.vn',
    fullName: 'Đào Đức (System Admin)',
    phone: '0988123456',
    status: 'ACTIVE',
    emailVerified: true,
    createdAt: '2026-07-20T10:00:00Z',
    updatedAt: '2026-07-20T10:00:00Z',
    roles: ['ADMIN', 'CINEMA_MANAGER']
  },
  {
    id: 2,
    email: 'manager.lm81@cinerush.vn',
    fullName: 'Hoàng Bách',
    phone: '0912345678',
    status: 'ACTIVE',
    emailVerified: true,
    createdAt: '2026-07-21T09:00:00Z',
    updatedAt: '2026-07-21T09:00:00Z',
    roles: ['CINEMA_MANAGER']
  },
  {
    id: 3,
    email: 'staff.checker1@cinerush.vn',
    fullName: 'Nguyễn Văn Staff',
    phone: '0909999888',
    status: 'ACTIVE',
    emailVerified: true,
    createdAt: '2026-07-21T09:30:00Z',
    updatedAt: '2026-07-21T09:30:00Z',
    roles: ['TICKET_CHECKER']
  },
  {
    id: 4,
    email: 'customer.test@gmail.com',
    fullName: 'Lê Văn Khách',
    phone: '0933111222',
    status: 'LOCKED',
    emailVerified: false,
    createdAt: '2026-07-21T10:00:00Z',
    updatedAt: '2026-07-21T10:00:00Z',
    roles: ['CUSTOMER']
  }
];
