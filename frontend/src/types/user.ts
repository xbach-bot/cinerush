export type UserStatus = 'ACTIVE' | 'LOCKED' | 'DISABLED';

export type Gender = 'MALE' | 'FEMALE' | 'OTHER' | 'UNDISCLOSED';

export interface Role {
  id: number;
  code: 'CUSTOMER' | 'ADMIN' | 'CINEMA_MANAGER' | 'TICKET_CHECKER';
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: number;
  email: string;
  fullName: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: Gender;
  avatarUrl?: string;
  status: UserStatus;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  roles: string[]; // Danh sách các mã vai trò (role codes) được gán
}
