export type ShowtimeStatus = 'DRAFT' | 'OPEN' | 'CLOSED' | 'CANCELLED' | 'FINISHED';

export interface Showtime {
  id: number;
  movieVersionId?: number;
  roomId?: number;
  startTime: string;
  endTime: string;
  basePrice: number;
  status: ShowtimeStatus;
  bookingOpenAt?: string;
  bookingCloseAt?: string;
  createdBy?: number;
  createdAt?: string;
  updatedAt?: string;

  // Populated fields for frontend display compatibility
  movieTitle?: string;
  movieVersion?: string;
  cinemaName?: string;
  roomName?: string;
}
