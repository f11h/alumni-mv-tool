import { TestBed, inject } from '@angular/core/testing';

import { UserLoggedInGuardService } from './user-logged-in-guard.service';

describe('UserLoggedInGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserLoggedInGuardService]
    });
  });

  it('should be created', inject([UserLoggedInGuardService], (service: UserLoggedInGuardService) => {
    expect(service).toBeTruthy();
  }));
});
