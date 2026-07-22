import type { Room } from './room';

export type CinemaStatus = 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE';

export interface Cinema {
  id: number;
  code: string;
  name: string;
  slug: string;
  address: string;
  province?: string;
  district?: string;
  phone?: string;
  email?: string;
  latitude?: number;
  longitude?: number;
  openingTime?: string;
  closingTime?: string;
  timezone: string;
  status: CinemaStatus;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  rooms: Room[];
}
