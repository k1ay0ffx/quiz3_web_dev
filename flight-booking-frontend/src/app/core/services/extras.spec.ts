import { TestBed } from '@angular/core/testing';

import { Extras } from './extras';

describe('Extras', () => {
  let service: Extras;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Extras);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
