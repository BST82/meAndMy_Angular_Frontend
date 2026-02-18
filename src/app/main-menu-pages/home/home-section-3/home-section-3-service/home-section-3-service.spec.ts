import { TestBed } from '@angular/core/testing';

import { HomeSection3Service } from './home-section-3-service';

describe('HomeSection3Service', () => {
  let service: HomeSection3Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeSection3Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
