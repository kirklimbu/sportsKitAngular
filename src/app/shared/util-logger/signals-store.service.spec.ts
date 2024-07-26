import { TestBed } from '@angular/core/testing';

import { SignalsStoreService } from './signals-store.service';

describe('SignalsStoreService', () => {
  let service: SignalsStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignalsStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
