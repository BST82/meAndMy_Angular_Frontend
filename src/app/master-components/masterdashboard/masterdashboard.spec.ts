import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Masterdashboard } from './masterdashboard';

describe('Masterdashboard', () => {
  let component: Masterdashboard;
  let fixture: ComponentFixture<Masterdashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Masterdashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Masterdashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
