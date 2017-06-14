import { Card } from '../card/card';
import { HttpModule } from '@angular/http';
import { CardsService } from '../card-service/cards.service';
import { FormsModule } from '@angular/forms';
import { CardDbService } from '../in-memory/in-memory-db.service';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CardsComponent } from './cards.component';

describe('CardsComponent', () => {
  let component: CardsComponent;
  let fixture: ComponentFixture<CardsComponent>;
  let cardsService: CardsService;
  let spy: jasmine.Spy;
  let cards: Card[];

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [CardsComponent],
      providers: [CardsService],
      imports: [HttpModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsComponent);
    component = fixture.componentInstance;
    cardsService = fixture.debugElement.injector.get(CardsService);

    cards = [{ id: 1, title: '0.5' }];
    spy = spyOn(cardsService, 'getCards')
      .and.returnValue(Promise.resolve(cards));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should fill cards field', async(() => {

    fixture.whenStable().then(() => { // wait for async getQuote
      fixture.detectChanges(); // update view with quote
      expect(component.cards).not.toBeNull();
      expect(component.cards).toBe(cards);
    });
  }));
});
