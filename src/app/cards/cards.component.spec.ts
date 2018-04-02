import { HttpModule } from '@angular/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Card } from './card';
import { CardsService } from './card-service/cards.service';
import { CardsComponent } from './cards.component';

describe('CardsComponent', () => {
  let component: CardsComponent;
  let fixture: ComponentFixture<CardsComponent>;
  let cardsService: CardsService;
  let spy: jasmine.Spy;
  let cards: Card[];

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [CardsComponent],
        imports: [HttpModule],
        providers: [CardsService],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsComponent);
    component = fixture.componentInstance;
    cardsService = fixture.debugElement.injector.get(CardsService);

    cards = [{ id: 1, title: '0.5' }];
    spy = spyOn(cardsService, 'getCards').and.returnValue(
      Promise.resolve(cards),
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it(
    'should fill cards field',
    async(() => {
      fixture.whenStable().then(() => {
        // wait for async getQuote
        fixture.detectChanges(); // update view with quote
        expect(component.cards).not.toBeNull();
        expect(component.cards).toBe(cards);
      });
    }),
  );
});
