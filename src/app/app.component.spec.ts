import {
  CardsService
} from './card-service/cards.service';
import {
  CardsComponent
} from './cards/cards.component';
import {
  CardDbService
} from './in-memory/in-memory-db.service';
import {
  InMemoryWebApiModule
} from 'angular-in-memory-web-api';
import {
  HttpModule
} from '@angular/http';
import {
  FormsModule
} from '@angular/forms';
import {
  BrowserModule
} from '@angular/platform-browser';
/* tslint:disable:no-unused-variable */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  AppComponent
} from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let cardsService : CardsService;
  let spy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CardsComponent,
      ],
      imports: [
        FormsModule,
        HttpModule
      ],
      providers: [CardsService],

    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    cardsService = fixture.debugElement.injector.get(CardsService);

    const cards = [{id: 1, title: '0.5'}];
    spy = spyOn(cardsService, 'getCards')
    .and.returnValue(Promise.resolve(cards));

    fixture.detectChanges();
  });

  it('should create the app', async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Please select A card to Vote!'`, async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Please select A card to Vote!');
  }));

  it('should render title in a h1 tag', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Please select A card to Vote!');
  }));

});
