import { Component, OnInit } from '@angular/core';
import {RoomService} from "../room-service/room.service";
import {Router} from "@angular/router";
import {SubscriptionHandler} from '../../utils/subscription-handler';

@Component({
  selector: 'app-pick-room',
  templateUrl: './pick-room.component.html',
  styleUrls: ['./pick-room.component.scss']
})
export class PickRoomComponent extends SubscriptionHandler implements OnInit {

  public rooms: any[];

  constructor(private roomService: RoomService, private router: Router) {
    super();
  }

  ngOnInit() {
    this.addSubscription(this.roomService.getAllRooms().subscribe(rooms => this.rooms = rooms));
  }

  goToRoom(roomId: any) {
    this.router.navigate(['/room', roomId]);
  }
}
