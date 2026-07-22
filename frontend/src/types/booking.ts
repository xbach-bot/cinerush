import type { SeatType } from './seat';

export type BookingStatus = 'PENDING' | 'PAYMENT_PROCESSING' | 'CONFIRMED' | 'EXPIRED' | 'CANCELLED';

export interface Booking {
  id: number;
  bookingCode: string;
  userId?: number;
  showtimeId?: number;
  status: BookingStatus;
  subtotal: number;
  discountAmount: number;
  feeAmount: number;
  totalAmount: number;
  expiresAt?: string;
  idempotencyKey?: string;
  cancelledAt?: string;
  cancellationReason?: string;
  createdAt: string;
  updatedAt: string;

  // Populated fields for frontend display compatibility
  customerName?: string;
  movieTitle?: string;
  cinemaName?: string;
  showtime?: string;
  seats?: string;
  paymentMethod?: string;
}

export interface BookingItem {
  id: number;
  bookingId: number;
  showtimeSeatId: number;
  seatCodeSnapshot: string;
  seatTypeSnapshot: SeatType;
  basePrice: number;
  surcharge: number;
  discountAmount: number;
  finalPrice: number;
  createdAt: string;
}
