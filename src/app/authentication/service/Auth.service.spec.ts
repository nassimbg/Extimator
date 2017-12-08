import { TestBed, inject } from '@angular/core/testing';
import { AuthService } from './Auth.service';

describe('Service: AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
    });
  });

  it(
    'should ...',
    inject([AuthService], (service: AuthService) => {
      expect(service).toBeTruthy();
    }),
  );
});
