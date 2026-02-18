import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSection4 } from './home-section-4';

describe('HomeSection4', () => {
  let component: HomeSection4;
  let fixture: ComponentFixture<HomeSection4>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSection4]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeSection4);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
