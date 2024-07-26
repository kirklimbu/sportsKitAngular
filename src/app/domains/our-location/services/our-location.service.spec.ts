import { TestBed } from '@angular/core/testing';

import { OurLocationService } from './our-location.service';

describe('OurLocationService', () => {
  let service: OurLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OurLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
