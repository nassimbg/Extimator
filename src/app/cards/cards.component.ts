import {Component, Input, OnInit} from '@angular/core';
import { AuthService } from '../authentication/service/Auth.service';
import { CardsService } from './card-service/cards.service';
import { VoteService } from '../vote-service/vote.service';
import { Card } from './card';
import { Vote } from '../vote-service/vote';

@Component({
  selector: 'app-cards',
  styleUrls: ['./cards.component.css'],
  templateUrl: './cards.component.html',
})
export class CardsComponent implements OnInit {
  public cards: Card[];
  public selectedCard: Card;
  private userId: string;

  @Input()
  private roomId: string;

  constructor(
    private cardsService: CardsService,
    private voteService: VoteService,
    private authService: AuthService,
  ) {}

  public ngOnInit() {
    this.getCards();
    this.authService.getUser().subscribe((user) => (this.userId = user.id));
  }

  public onSelect(card: Card): void {
    this.selectedCard = card;
  }

  public onCheck(): void {
    this.voteService.vote(this.roomId, new Vote(this.userId, this.selectedCard.id));
  }

  private getCards(): void {
    this.cardsService.getCards().subscribe((cards) => (this.cards = cards));
  }
}
