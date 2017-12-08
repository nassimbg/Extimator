import { TestBed, inject } from '@angular/core/testing';
import { InMemoryDbService } from 'angular-in-memory-web-api';

describe('InMemoryDbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InMemoryDbService],
    });
  });

  it(
    'should ...',
    inject([InMemoryDbService], (service: InMemoryDbService) => {
      expect(service).toBeTruthy();
    }),
  );
});
