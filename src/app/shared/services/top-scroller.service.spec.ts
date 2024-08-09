import { TestBed } from '@angular/core/testing';

import { TopScrollerService } from './top-scroller.service';

describe('TopScrollerService', () => {
  let service: TopScrollerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopScrollerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
