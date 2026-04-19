import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Extra } from '../models/extras.model';

const MOCK_EXTRAS: Extra[] = [
  { id: 1, type: 'baggage', name: 'Багаж 23 кг', description: '1 чемодан до 23 кг в багажный отсек', price: 5000 },
  { id: 2, type: 'baggage', name: 'Багаж 32 кг', description: '1 чемодан до 32 кг в багажный отсек', price: 8000 },
  { id: 3, type: 'carry_on', name: 'Доп. ручная кладь', description: 'Дополнительная сумка до 10 кг в салон', price: 3000 },
  { id: 4, type: 'meal', name: 'Стандартное питание', description: 'Горячее блюдо на борту', price: 2500 },
  { id: 5, type: 'meal', name: 'Вегетарианское питание', description: 'Меню без мяса и рыбы', price: 2500 },
  { id: 6, type: 'meal', name: 'Детское питание', description: 'Меню для детей до 12 лет', price: 2000 },
  { id: 7, type: 'insurance', name: 'Базовая страховка', description: 'Страхование от несчастных случаев в полёте', price: 1500 },
  { id: 8, type: 'insurance', name: 'Полная страховка', description: 'Медицинская + задержка + отмена рейса', price: 4500 },
];

@Injectable({ providedIn: 'root' })
export class ExtrasService {
  constructor(private http: HttpClient) {}

  getExtras(): Observable<Extra[]> {
    if (environment.useMock) return of(MOCK_EXTRAS).pipe(delay(300));
    return this.http.get<Extra[]>(`${environment.apiUrl}/extras/`);
  }
}