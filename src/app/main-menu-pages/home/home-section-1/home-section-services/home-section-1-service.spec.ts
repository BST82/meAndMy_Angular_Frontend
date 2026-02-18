import { TestBed } from '@angular/core/testing';

import { HomeSection1Service } from './home-section-1-service';

describe('HomeSection1Service', () => {
  let service: HomeSection1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeSection1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
