import { TestBed } from '@angular/core/testing';

import { RequestNotifierService } from './request-notifier.service';

describe('RequestNotifierService', () => {
  let service: RequestNotifierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestNotifierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
