import {Component, Input, OnInit} from '@angular/core';
import {Room} from "../room";
import {Router} from "@angular/router";
import {RoomService} from "../room-service/room.service";

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit {

  public room: Room;
  constructor(private roomService: RoomService, private router: Router) { }

  ngOnInit() {
    this.newRoom();

  }

  newRoom() {
    this.room = new Room(undefined);
  }

  onSubmit() {
    let roomId = this.roomService.push(this.room);
    this.router.navigate(['/room', roomId]);
  }

}
