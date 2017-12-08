import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room',
  styleUrls: ['./room.component.css'],
  templateUrl: './room.component.html',
})
export class RoomComponent implements OnInit {
  public votingButton: string;
  public votingEnabled: boolean;

  public ngOnInit() {
    this.votingButton = 'start voting';
  }

  public votingEnabler() {
    this.votingButton = this.votingEnabled ? 'start voting' : 'stop voting';
    this.votingEnabled = !this.votingEnabled;
  }
}
