import { CardsService } from '../card-service/cards.service';
import { VoteService } from '../vote-service/vote.service';
import {AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';
import { Card } from 'app/card/card';
import { Observable } from 'rxjs/Rx';
import { Vote } from 'app/voters/vote';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  cards: Card[];
  selectedCard: Card;

  constructor(private cardsService: CardsService, private voteService: VoteService) {}

  ngOnInit() {
    this.getCards();
  }

  private getCards(): void {
    this.cardsService.getCards().then(cards => this.cards = cards);
  }

  onSelect(card: Card): void {
    this.selectedCard = card;
  }

  onCheck(): void {
    const vote = new Vote();
    vote.name = 'nassim';
    vote.card = this.selectedCard;

    this.voteService.vote(vote);
  }
}
