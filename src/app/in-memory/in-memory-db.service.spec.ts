import { InMemoryDbService } from 'angular-in-memory-web-api';
/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';

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
    })
  );
});
