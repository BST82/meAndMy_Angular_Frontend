import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSection3 } from './home-section-3';

describe('HomeSection3', () => {
  let component: HomeSection3;
  let fixture: ComponentFixture<HomeSection3>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSection3]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeSection3);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
