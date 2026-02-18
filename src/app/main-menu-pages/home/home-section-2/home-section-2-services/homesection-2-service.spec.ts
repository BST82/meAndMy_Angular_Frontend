import { TestBed } from '@angular/core/testing';

import { Homesection2Service } from './homesection-2-service';

describe('Homesection2Service', () => {
  let service: Homesection2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Homesection2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
