import { print } from 'util';
import { Component, OnInit } from '@angular/core';
import { SimpleTimer } from 'ng2-simple-timer';
import { AngularFireAuth } from 'angularfire2/auth';
import {Router} from "@angular/router";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

 votingButton: string;
 votingEnabled: boolean;

  constructor() { }

  ngOnInit() {
    this.votingButton = 'start voting';
  }

  votingEnabler() {
    if (this.votingEnabled) {
      this.votingButton = 'start voting';
    } else {
      this.votingButton = 'stop voting';
    }

    this.votingEnabled = !this.votingEnabled;
  }
}
