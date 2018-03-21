import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import "rxjs/add/operator/mergeMap";
import {RoomService} from "./room-service/room.service";
import {AuthService} from "../authentication/service/Auth.service";

@Component({
  selector: 'app-room',
  styleUrls: ['./room.component.css'],
  templateUrl: './room.component.html',
})
export class RoomComponent implements OnInit {
  public votingButton: string;
  public votingEnabled: boolean;
  private roomId: string;

  constructor( private route: ActivatedRoute, private roomService: RoomService, private auth: AuthService) {
  }

  public ngOnInit() {
    this.route.paramMap
      .map((params: ParamMap) =>  params.get('id'))
      .subscribe(id => {
        this.auth.getUser().subscribe( p=> this.roomService.addParticipant(id,p.id ));
        this.roomId = id;
      });


    this.votingButton = 'start voting';
  }

  public votingEnabler() {
    this.votingButton = this.votingEnabled ? 'start voting' : 'stop voting';
    this.votingEnabled = !this.votingEnabled;
  }
}
