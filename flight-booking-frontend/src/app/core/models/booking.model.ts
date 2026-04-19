import { Flight } from './flight.model';
import { Extra } from './extras.model';

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface Passenger {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  passport_number: string;
  passport_expiry: string;
  nationality: string;
  email?: string;
  phone?: string;
}

export interface CreateBookingRequest {
  flight_id: number;
  return_flight_id?: number;
  seat_ids: number[];
  passengers: Passenger[];
  extra_ids?: number[];
  cabin_class: string;
}

export interface Booking {
  id: number;
  booking_reference: string;
  status: BookingStatus;
  flight: Flight;
  return_flight?: Flight;
  seat_numbers: string[];
  passengers: Passenger[];
  extras: Extra[];
  total_price: number;
  cabin_class: string;
  created_at: string;
  pdf_ticket_url?: string;
}

export interface PaymentRequest {
  booking_id: number;
  card_number: string;  // simulated
  card_expiry: string;
  card_cvv: string;
  cardholder_name: string;
}

export interface PaymentResponse {
  success: boolean;
  transaction_id: string;
  booking_reference: string;
  message: string;
}

export interface CancelBookingResponse {
  success: boolean;
  refund_amount: number;
  message: string;
}