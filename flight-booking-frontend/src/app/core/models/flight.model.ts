export interface Airport {
  id: number;
  iata_code: string;
  name: string;
  city: string;
  country: string;
}

export interface Airline {
  id: number;
  name: string;
  iata_code: string;
}

export type CabinClass = 'economy' | 'business' | 'first';
export type TripType = 'one_way' | 'round_trip';

export interface FlightSearchParams {
  origin: string;       // IATA code
  destination: string;  // IATA code
  departure_date: string;
  return_date?: string;
  passengers: number;
  cabin_class: CabinClass;
  trip_type: TripType;
}

export interface Flight {
  id: number;
  flight_number: string;
  airline: Airline;
  origin: Airport;
  destination: Airport;
  departure_time: string;
  arrival_time: string;
  duration_minutes: number;
  stops: number;
  price_economy: number;
  price_business: number;
  price_first: number;
  available_seats_economy: number;
  available_seats_business: number;
  available_seats_first: number;
  aircraft_model: string;
}