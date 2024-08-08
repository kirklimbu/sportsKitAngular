import { TestBed } from '@angular/core/testing';

import { TraineeService } from './trainee.service';

describe('TraineeService', () => {
  let service: TraineeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraineeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
