import { CardsService } from 'app/card-service/cards.service';
import { Component, Input, OnInit } from '@angular/core/';
import { Vote } from 'app/voters/vote';

@Component({
  selector: 'app-displayed-vote',
  template: `<mat-card class="col-lg-3 col-md-3 col-sm-3 col-xs-1">
            <mat-card-header class="justify-content-center">{{userID}}</mat-card-header>
            <mat-card-content class="justify-content-center">{{cardTitle}}</mat-card-content></mat-card>`,
  styleUrls: [],
})
export class DisplayedVoteComponent implements OnInit {
  userID: string;
  cardTitle: string;

  @Input() votey: Vote;

  constructor(private cardsService: CardsService) {}

  public ngOnInit() {
    this.userID = this.votey.userID;
    console.log(this.votey.cardId);
    this.cardsService
      .getCardValueFor(this.votey.cardId)
      .subscribe(p => (this.cardTitle = p));
  }
}
