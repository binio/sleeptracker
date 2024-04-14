import { TestBed } from '@angular/core/testing';

import { SleepDataService } from './sleep-data.service';

describe('SleepDataService', () => {
  let service: SleepDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SleepDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
