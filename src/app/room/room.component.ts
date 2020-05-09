import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {RoomService} from "./room-service/room.service";
import {AuthService} from "../authentication/service/Auth.service";
import {VoteService} from "../vote-service/vote.service";
import {map} from "rxjs/operators";
import {MatSidenav} from "@angular/material/sidenav";
import {Utils} from "../utils/utils";

@Component({
  selector: 'app-room',
  styleUrls: ['./room.component.scss'],
  templateUrl: './room.component.html',
})
export class RoomComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenav;

  public votingButton: string;
  public votingEnabled: boolean;
  public isExpanded: boolean;
  roomId: string;
  currentStory: string;

  constructor( private route: ActivatedRoute, private roomService: RoomService, private auth: AuthService, private votingService: VoteService) {
  }

  public ngOnInit() {

    this.route.paramMap
      .pipe(map((params: ParamMap) =>  params.get('id')))
      .subscribe(id => {
        this.auth
          .getUser().subscribe(p => this.roomService.addParticipant(id, p.id));
        this.roomId = id;
      });

    this.votingService.getVotingStatues(this.roomId)
      .subscribe(votingEnabled => {
        this.votingEnabled = votingEnabled;
        this.votingButton = votingEnabled ? 'stop voting' : 'start voting';
      });

    this.roomService.currentStory(this.roomId).subscribe(currentStory => this.currentStory = currentStory);
  }

  public votingEnabler() {
    let tempVotingEnabled = !this.votingEnabled;

    if (tempVotingEnabled) {
      this.votingService.resetVotes(this.roomId, this.currentStory);
    }
    this.votingService.setVotingStatues(this.roomId, tempVotingEnabled);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < Utils.getMinMediumScreenSize()) {
      this.isExpanded = false;
    }
  }

  expandNav() {
    this.isExpanded = !this.isExpanded;

    if (!Utils.isAtLeastMediumScreen() && this.isExpanded) {
      this.sidenav.mode = "over";
    } else {
      this.sidenav.mode = "side";
    }
  }
}
