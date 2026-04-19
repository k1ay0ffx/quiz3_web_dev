export type SeatClass = 'economy' | 'business' | 'first';
export type SeatStatus = 'available' | 'occupied' | 'selected';

export interface Seat {
  id: number;
  seat_number: string;
  row: number;
  column: string;
  cabin_class: SeatClass;
  status: SeatStatus;
  extra_legroom: boolean;
  window: boolean;
  aisle: boolean;
  price_surcharge?: number;
}

export interface SeatMap {
  flight_id: number;
  aircraft_model: string;
  seats: Seat[];
}