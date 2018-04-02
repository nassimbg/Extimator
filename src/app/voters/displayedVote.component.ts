import { Component, Input, OnInit } from '@angular/core/';
import { Vote } from '../vote-service/vote';
import { CardsService } from '../cards/card-service/cards.service';
import {UserManager} from "../UserManagement/UserManager.service";

@Component({
  selector: 'app-displayed-vote',
  styleUrls: [],
  template: `
    <mat-card class="col-lg-3 col-md-3 col-sm-3 col-xs-1">
            <mat-card-header class="justify-content-center">{{userID}}</mat-card-header>
      <img mat-card-image [src]='photo' alt="Photo of a Shiba Inu">
            <mat-card-content class="justify-content-center">{{cardTitle}}</mat-card-content>
  </mat-card>`,
})
export class DisplayedVoteComponent implements OnInit {
  public userID: string;
  public cardTitle: string;
  public photo: string;

  @Input() public votey: Vote;

  constructor(private cardsService: CardsService, private userService: UserManager) {}

  public ngOnInit() {
    this.userService.findUser(this.votey.userID)
      .subscribe(user => {this.userID = user.name; this.photo = user.photoURL});

    this.cardsService
      .getCardValueFor(this.votey.cardId)
      .subscribe(cardTitle => (this.cardTitle = cardTitle));
  }
}
