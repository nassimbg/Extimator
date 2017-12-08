import { Component, Input, OnInit } from '@angular/core/';
import { Vote } from '../voters/vote';
import { CardsService } from '../card-service/cards.service';

@Component({
  selector: 'app-displayed-vote',
  styleUrls: [],
  template: `<mat-card class="col-lg-3 col-md-3 col-sm-3 col-xs-1">
            <mat-card-header class="justify-content-center">{{userID}}</mat-card-header>
            <mat-card-content class="justify-content-center">{{cardTitle}}</mat-card-content></mat-card>`,
})
export class DisplayedVoteComponent implements OnInit {
  public userID: string;
  public cardTitle: string;

  @Input() public votey: Vote;

  constructor(private cardsService: CardsService) {}

  public ngOnInit() {
    this.userID = this.votey.userID;
    this.cardsService
      .getCardValueFor(this.votey.cardId)
      .subscribe((p) => (this.cardTitle = p));
  }
}
