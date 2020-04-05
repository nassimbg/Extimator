import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { VoteService } from '../vote-service/vote.service';
import { Vote } from '../vote-service/vote';
import {CardsService} from "../cards/card-service/cards.service";
import {UserManager} from "../UserManagement/UserManager.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-voters',
  styleUrls: ['./voters.component.scss'],
  templateUrl: './voters.component.html',
})
export class VotersComponent implements OnInit, OnChanges {
  public votes: DisplayedVote[];

  @Input()
  private roomId: string;

  @Input()
  private showMore: boolean;

  @Input()
  private currentStory: string;

  constructor(private voteService: VoteService, private cardsService: CardsService, private userService: UserManager) {}

  public ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    let currentStory = changes.currentStory;

    if (currentStory?.currentValue !== currentStory?.previousValue) {
      this.voteService.getVotes(this.roomId, currentStory.currentValue)
        .pipe(
          map(votes => this.getDisplayedVotes(votes))
        ).subscribe((p) => (this.votes = p));
    }
  }

  private getDisplayedVotes(votes) {
    return votes.map(vote => {
      let displayedVote = new DisplayedVote();
      this.userService.findUser(vote.userID)
        .subscribe(user => {
          displayedVote.userID = user.name;
          displayedVote.photo = user.photoURL
        });

      this.cardsService
        .getCardValueFor(vote.cardId)
        .subscribe(cardTitle => (displayedVote.cardTitle = cardTitle));

      return displayedVote;
    });
  }
}

class DisplayedVote {
  public userID: string;
  public cardTitle: string;
  public photo: string;
}
