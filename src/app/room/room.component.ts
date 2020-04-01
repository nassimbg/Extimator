import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {RoomService} from "./room-service/room.service";
import {AuthService} from "../authentication/service/Auth.service";
import {VoteService} from "../vote-service/vote.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-room',
  styleUrls: ['./room.component.scss'],
  templateUrl: './room.component.html',
})
export class RoomComponent implements OnInit {
  public votingButton: string;
  public votingEnabled: boolean;
  roomId: string;

  constructor( private route: ActivatedRoute, private roomService: RoomService, private auth: AuthService, private votingService: VoteService) {
  }

  public ngOnInit() {
    this.route.paramMap
      .pipe(map((params: ParamMap) =>  params.get('id')))
      .subscribe(id => {
        this.auth.getUser().subscribe( p=> this.roomService.addParticipant(id,p.id ));
        this.roomId = id;
      });

    this.votingService.getVotingStatues(this.roomId)
      .subscribe(votingEnabled => {
        this.votingEnabled = votingEnabled;
        this.votingButton = votingEnabled ? 'stop voting' : 'start voting';
      });
  }

  public votingEnabler() {
    this.votingService.setVotingStatues(this.roomId, !this.votingEnabled);
  }
}
