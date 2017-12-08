/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CardsService } from './cards.service';
//TODO Mock BACK END use xdescribe to skip test or fdescribe to run this test only
xdescribe('CardsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CardsService],
    });
  });

  it(
    'should ...',
    inject([CardsService], (service: CardsService) => {
      expect(service).toBeTruthy();
    })
  );
});
