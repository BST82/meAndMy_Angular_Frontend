import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyHoroscope } from './daily-horoscope';

describe('DailyHoroscope', () => {
  let component: DailyHoroscope;
  let fixture: ComponentFixture<DailyHoroscope>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyHoroscope]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyHoroscope);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
