export type PaymentMethod = 'MOCK' | 'CASH' | 'BANK_TRANSFER' | 'VNPAY' | 'MOMO';

export type PaymentStatus = 'PENDING' | 'PROCESSING' | 'SUCCESS' | 'FAILED' | 'TIMEOUT' | 'REFUNDED';

export interface Payment {
  id: number;
  bookingId: number;
  transactionCode: string;
  paymentMethod: PaymentMethod;
  amount: number;
  status: PaymentStatus;
  providerResponse?: any;
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
}
