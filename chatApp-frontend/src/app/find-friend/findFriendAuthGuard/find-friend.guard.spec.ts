import { TestBed } from '@angular/core/testing';

import { FindFriendGuard } from './find-friend.guard';

describe('FindFriendGuard', () => {
  let guard: FindFriendGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FindFriendGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
