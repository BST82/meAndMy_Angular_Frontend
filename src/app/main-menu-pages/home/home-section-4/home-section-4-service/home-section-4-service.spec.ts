import { TestBed } from '@angular/core/testing';

import { HomeSection4Service } from './home-section-4-service';

describe('HomeSection4Service', () => {
  let service: HomeSection4Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeSection4Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
