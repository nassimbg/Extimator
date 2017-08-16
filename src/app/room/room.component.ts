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

  timerId: string;
  counter = 0;
  timerButton = 'Start';
  constructor(private st: SimpleTimer, public afAuth: AngularFireAuth) {
    if(!this.afAuth.auth.currentUser){
      Router.prototype.navigateByUrl("./");
    }
  }

  ngOnInit() {
    this.st.newTimer('1sec', 1);
  }

  subscribeTimer() {
    if (this.timerId) {
      // Unsubscribe if timer Id is defined
      this.st.unsubscribe(this.timerId);
      this.timerId = undefined;
      this.timerButton = 'Start';
      console.log('timer 0 Unsubscribed.');
    } else {
      // Subscribe if timer Id is undefined
      this.timerId = this.st.subscribe('1sec', e => this.timerCallback());
      this.timerButton = 'Stop';
      console.log('timer 0 Subscribed.');
    }
    console.log(this.st.getSubscription());
  }

  timerCallback() {
    this.counter++;
  }



}