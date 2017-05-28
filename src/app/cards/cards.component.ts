import {
  Component,
  OnInit
} from '@angular/core';
import {
  CardsService
} from '../card-service/cards.service';
import {
  Card
} from 'app/card/card';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  cards: Card[];
  selectedCard: Card;

  constructor(private cardsService: CardsService) {}

  ngOnInit() {
    this.getCards();
  }

  private getCards(): void {
    this.cardsService.getCards().then(cards => this.cards = cards);
  }

  onSelect(card: Card): void {
    this.selectedCard = card;
  }
}
