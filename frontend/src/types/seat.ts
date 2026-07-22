export type SeatType = 'STANDARD' | 'VIP' | 'COUPLE' | 'ACCESSIBLE';

export type ShowtimeSeatStatus = 'AVAILABLE' | 'HELD' | 'SOLD' | 'BLOCKED';

export interface Seat {
  id: number;
  roomId: number;
  rowName: string;
  seatNumber: number;
  seatCode: string;
  seatType: SeatType;
  positionX: number;
  positionY: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ShowtimeSeat {
  id: number;
  showtimeId: number;
  seatId: number;
  status: ShowtimeSeatStatus;
  price: number;
  holdToken?: string;
  holdExpiresAt?: string;
  version: number;
  updatedAt: string;
}
