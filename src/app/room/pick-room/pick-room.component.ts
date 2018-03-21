import { Component, OnInit } from '@angular/core';
import {RoomService} from "../room-service/room.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-pick-room',
  templateUrl: './pick-room.component.html',
  styleUrls: ['./pick-room.component.css']
})
export class PickRoomComponent implements OnInit {

  public rooms: any[];

  constructor(private roomService: RoomService, private router: Router) { }

  ngOnInit() {
    this.roomService.getAllRooms().subscribe(rooms => this.rooms = rooms);
  }

  goToRoom(roomId: any) {
    this.router.navigate(['/room', roomId]);
  }
}
