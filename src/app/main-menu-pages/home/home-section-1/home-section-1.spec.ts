import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSection1 } from './home-section-1';

describe('HomeSection1', () => {
  let component: HomeSection1;
  let fixture: ComponentFixture<HomeSection1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSection1]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeSection1);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
