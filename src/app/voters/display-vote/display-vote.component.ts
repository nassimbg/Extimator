import {Component, Input, OnInit} from '@angular/core';
import {Vote} from "../../vote-service/vote";
import {CardsService} from "../../cards/card-service/cards.service";
import {UserManager} from "../../UserManagement/UserManager.service";

@Component({
  selector: 'app-display-vote',
  templateUrl: './display-vote.component.html',
  styleUrls: ['./display-vote.component.css']
})
export class DisplayVoteComponent implements OnInit {

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
