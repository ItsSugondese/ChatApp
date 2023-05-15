import { TestBed } from '@angular/core/testing';

import { FindFriendService } from './find-friend.service';

describe('FindFriendService', () => {
  let service: FindFriendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindFriendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
