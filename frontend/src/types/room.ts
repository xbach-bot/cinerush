export type RoomType = 'STANDARD' | 'IMAX' | 'FOUR_DX' | 'SCREEN_X';

export type RoomStatus = 'ACTIVE' | 'MAINTENANCE' | 'INACTIVE';

export interface Room {
  id: number;
  cinemaId: number;
  code: string;
  name: string;
  roomType: RoomType;
  totalSeats: number;
  cleaningBufferMinutes: number;
  status: RoomStatus;
  createdAt: string;
  updatedAt: string;
}
