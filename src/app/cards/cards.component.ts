import { AuthService } from '../authentication/service/Auth.service';
import { CardsService } from '../card-service/cards.service';
import { VoteService } from '../vote-service/vote.service';
import { Component, OnInit } from '@angular/core';
import { Card } from 'app/card/card';
import { Vote } from 'app/voters/vote';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  cards: Card[];
  selectedCard: Card;
  userName: string;


  constructor(private cardsService: CardsService, private voteService: VoteService, private authService: AuthService) {}

  ngOnInit() {
    this.getCards();
    this.authService.getUser().subscribe(user => this.userName = user.displayName);
  }

  private getCards(): void {
  this.cardsService.getCards().then(cards => this.cards = cards);
  }

  onSelect(card: Card): void {
    this.selectedCard = card;
  }

  onCheck(): void {
    const vote = new Vote();
    vote.userID = this.userName;
    vote.cardId = this.selectedCard.id;
    this.voteService.vote(vote);
  }
}
