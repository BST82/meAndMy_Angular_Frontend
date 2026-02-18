import { TestBed } from '@angular/core/testing';

import { DailyHoroscopeService } from './daily-horoscope-service';

describe('DailyHoroscopeService', () => {
  let service: DailyHoroscopeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailyHoroscopeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
