/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InMemoryDbService } from './in-memory-db.service';

describe('InMemoryDbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InMemoryDbService]
    });
  });

  it('should ...', inject([InMemoryDbService], (service: InMemoryDbService) => {
    expect(service).toBeTruthy();
  }));
});
