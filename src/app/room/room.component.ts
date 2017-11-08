import { Component, OnInit } from '@angular/core';

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
