import { TestBed } from '@angular/core/testing';

import { FamousPlaces } from './famous-places';

describe('FamousPlaces', () => {
  let service: FamousPlaces;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FamousPlaces);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
