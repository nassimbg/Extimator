import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authentication/service/Auth.service';
import { CardsService } from '../card-service/cards.service';
import { VoteService } from '../vote-service/vote.service';
import { Card } from '../card/card';
import { Vote } from '../voters/vote';

@Component({
  selector: 'app-cards',
  styleUrls: ['./cards.component.css'],
  templateUrl: './cards.component.html',
})
export class CardsComponent implements OnInit {
  public cards: Card[];
  public selectedCard: Card;
  private userName: string;

  constructor(
    private cardsService: CardsService,
    private voteService: VoteService,
    private authService: AuthService,
  ) {}

  public ngOnInit() {
    this.getCards();
    this.authService.getUser().subscribe((user) => (this.userName = user.uid));
  }

  public onSelect(card: Card): void {
    this.selectedCard = card;
  }

  public onCheck(): void {
    const vote: Vote = {};
    vote.userID = this.userName;
    vote.cardId = this.selectedCard.id;
    this.voteService.vote(vote);
  }

  private getCards(): void {
    this.cardsService.getCards().subscribe((cards) => (this.cards = cards));
  }
}
