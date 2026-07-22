export type TicketStatus = 'VALID' | 'USED' | 'CANCELLED';

export interface Ticket {
  id: number;
  ticketCode: string;
  bookingItemId: number;
  qrToken: string;
  status: TicketStatus;
  issuedAt: string;
  usedAt?: string;
  cancelledAt?: string;
  createdAt: string;
}

export interface ScanResult {
  status: 'VALID' | 'ALREADY_USED' | 'INVALID';
  ticketCode?: string;
  movieTitle?: string;
  cinemaName?: string;
  roomName?: string;
  seatCode?: string;
  showtime?: string;
  customerName?: string;
  usedAt?: string;
}
