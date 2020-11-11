import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { VoteService } from '../vote-service/vote.service';
import {UserManager} from "../UserManagement/UserManager.service";
import {filter, map, mergeMap, tap} from "rxjs/operators";
import {RoomService} from "../room/room-service/room.service";
import {combineLatest, of} from "rxjs";
import {User} from "../UserManagement/user";
import {fromArray} from "rxjs/internal/observable/fromArray";
import {SubscriptionHandler} from '../utils/subscription-handler';
import {Subscription} from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-voters',
  styleUrls: ['./voters.component.scss'],
  templateUrl: './voters.component.html',
})
export class VotersComponent extends SubscriptionHandler implements OnInit, OnChanges {

  public participants: Map<string, DisplayedVoter>;

  @Input()
  private roomId: string;

  @Input()
  private showMore: boolean;

  @Input()
  private currentStory: string;

  private votesSubscription : Subscription;
  private facilitator: string;

  constructor(private voteService: VoteService, private userService: UserManager, private roomService: RoomService) {
    super();
    this.participants = new Map();
  }

  public ngOnInit() {
    this.addSubscription(this.roomService.getParticipants(this.roomId)
      .pipe(
        mergeMap(participants => combineLatest(participants.map(participantId => this.userService.findUser(participantId)))),
        map(participants => fromArray(participants)),
        mergeMap(obv => obv),
        filter(user => user !== null)
      )
      .subscribe(participant => this.addUserToParticipants(participant)));

    this.addSubscription(this.roomService.getFacilitator(this.roomId)
      .subscribe(facilitator => this.facilitator = facilitator)
    );
  }

  private addUserToParticipants(user) {
    const displayedVoter = this.participants.get(user.id);

    if (displayedVoter) {
      displayedVoter.user = user;
    } else {
      this.participants.set(user.id, new DisplayedVoter(user));
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    let currentStory = changes.currentStory;

    if (currentStory?.currentValue !== currentStory?.previousValue) {
      if (!!this.votesSubscription) {
        this.votesSubscription.unsubscribe();
      }

      this.votesSubscription = this.voteService.getVotes(this.roomId, currentStory.currentValue)
        .pipe(
          tap(() => this.participants?.forEach(voter => voter.resetVote())),
          map(votes => fromArray(votes)),
          mergeMap(obv => obv)
        ).subscribe((vote) => this.addVoterToParticipants(vote));
    }
  }

  private addVoterToParticipants(vote) {
    let displayedVoter = this.participants.get(vote.userID);

    if (!displayedVoter) {
      displayedVoter = new DisplayedVoter();
      this.participants.set(vote.userID, displayedVoter);
    }

    displayedVoter.setVote(true);
  }

  getVoterPhoto(voter: DisplayedVoter) {
    return 'url(' + voter.photo + ')'
  }

  getVotingStatues(voter: DisplayedVoter) {
    return voter.voted ? 'primary' :  'accent'
  }

  isFacilitator(displayedVoter: DisplayedVoter) {
    return this.facilitator === displayedVoter.userID;
  }

  outputTooltipInfo(displayedVoter: DisplayedVoter)  {
    const isFacilitator = this.isFacilitator(displayedVoter) ? ' (Facilitator)' : '';
    return `${displayedVoter.userName}${isFacilitator}`;
  }
}

class DisplayedVoter {

  private _user: User;
  _voted: boolean = false;
  _cardTitle: string;

  constructor(user?: User) {
    this._user = user;
  }

  setVote(voted: boolean, cardTitle?: string ) {
    this._voted = voted;

    if (cardTitle) {
      this._cardTitle = cardTitle;
    }
  }

  get userID() : string {
    return this._user?.id;
  }

  get userName(): string {
    return this._user?.name;
  }

  public get photo(): string {
    return this._user?.photoURL;
  }

  get voted(): boolean {
    return this._voted;
  }

  get cardTitle(): string {
    return this._cardTitle;
  }

  set voted(value: boolean) {
    this._voted = value;
  }

  set cardTitle(value: string) {
    this._cardTitle = value;
  }

  set user(value: User) {
    this._user = value;
  }

  resetVote() {
    this._voted = false;
    this._cardTitle = undefined;
  }
}
