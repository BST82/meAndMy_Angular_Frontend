import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EPooja } from './e-pooja';

describe('EPooja', () => {
  let component: EPooja;
  let fixture: ComponentFixture<EPooja>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EPooja]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EPooja);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
