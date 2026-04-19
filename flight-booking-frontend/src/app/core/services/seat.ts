import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Seat, SeatMap } from '../models/seat.model';

function generateMockSeats(flightId: number): Seat[] {
  const seats: Seat[] = [];
  let id = 1;
  // First class: rows 1-3, cols A-D
  for (let row = 1; row <= 3; row++) {
    for (const col of ['A', 'B', 'C', 'D']) {
      const occupied = Math.random() < 0.3;
      seats.push({
        id: id++, seat_number: `${row}${col}`, row, column: col,
        cabin_class: 'first', status: occupied ? 'occupied' : 'available',
        extra_legroom: true, window: col === 'A' || col === 'D', aisle: col === 'B' || col === 'C',
        price_surcharge: 15000
      });
    }
  }
  // Business: rows 4-9, cols A-F
  for (let row = 4; row <= 9; row++) {
    for (const col of ['A', 'B', 'C', 'D', 'E', 'F']) {
      const occupied = Math.random() < 0.35;
      seats.push({
        id: id++, seat_number: `${row}${col}`, row, column: col,
        cabin_class: 'business', status: occupied ? 'occupied' : 'available',
        extra_legroom: row === 4, window: col === 'A' || col === 'F', aisle: col === 'C' || col === 'D',
        price_surcharge: 5000
      });
    }
  }
  // Economy: rows 10-30, cols A-F
  for (let row = 10; row <= 30; row++) {
    for (const col of ['A', 'B', 'C', 'D', 'E', 'F']) {
      const occupied = Math.random() < 0.45;
      seats.push({
        id: id++, seat_number: `${row}${col}`, row, column: col,
        cabin_class: 'economy', status: occupied ? 'occupied' : 'available',
        extra_legroom: row === 10 || row === 15, window: col === 'A' || col === 'F', aisle: col === 'C' || col === 'D',
        price_surcharge: row === 10 || row === 15 ? 2000 : 0
      });
    }
  }
  return seats;
}

@Injectable({ providedIn: 'root' })
export class SeatService {
  constructor(private http: HttpClient) {}

  getSeatMap(flightId: number): Observable<SeatMap> {
    if (environment.useMock) {
      return of({
        flight_id: flightId,
        aircraft_model: 'Boeing 767-300',
        seats: generateMockSeats(flightId)
      }).pipe(delay(500));
    }
    return this.http.get<SeatMap>(`${environment.apiUrl}/flights/${flightId}/seats/`);
  }
}