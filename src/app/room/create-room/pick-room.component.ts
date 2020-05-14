import {Component, HostListener, Input, OnInit} from '@angular/core';
import {Room} from "../room";
import {Router} from "@angular/router";
import {RoomService} from "../room-service/room.service";
import {Utils} from '../../utils/utils';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {SubscriptionHandler} from '../../utils/subscription-handler';

@Component({
  selector: 'app-pick-room',
  templateUrl: './pick-room.component.html',
  styleUrls: ['./pick-room.component.scss']
})
export class PickRoomComponent extends SubscriptionHandler implements OnInit {

  isXSmallScreen: boolean;

  createRoomForm: FormGroup;

  findRoomForm: FormGroup;
  roomDoesntExist: boolean;
  myRooms: any[];

  inProcess: boolean;

  constructor(private roomService: RoomService, private router: Router, private fb: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.isXSmallScreen = !Utils.isAtLeastSmallScreen();

    this.createRoomForm = this.fb.group({
      roomName: ['', Validators.required]
    });

    this.findRoomForm = this.fb.group({
        roomID: [''],
        selectedRoom: ['']
    },
      {validator : this.wasRoomPicked});

    this.addSubscription(this.roomService.getAllRooms().subscribe(rooms => this.myRooms = rooms))
  }

  onSubmit() {
    if (this.createRoomForm.valid) {
      this.inProcess = true;
      const roomName = this.createRoomForm.get('roomName').value;
      const room = new Room(roomName);
      const roomId = this.roomService.push(room);
      this.router.navigate(['/room', roomId])
        .finally(() => this.inProcess = false);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.isXSmallScreen = event.target.innerWidth < Utils.getMinSmallScreenSize();
  }

  wasRoomPicked(control: AbstractControl): ValidationErrors | null {
    const roomID = PickRoomComponent.getRoomId(control);

    return !!roomID ? null : {'noRoomSelected' : true} ;
  }

  static getRoomId(control: AbstractControl): string | null {
    const roomID = control.get('roomID').value;
    const selectedRoom = control.get('selectedRoom').value;

    let roomVal = null;
    if (!!roomID) {
      roomVal = roomID;
    } else if (!!selectedRoom) {
      roomVal = selectedRoom;
    }

    return roomVal;
  }

  findRoom() {
    this.roomDoesntExist = false;
    if (this.findRoomForm.valid) {
      this.inProcess = true;
      const roomId = PickRoomComponent.getRoomId(this.findRoomForm);
      this.roomService.doesRoomExist(roomId)
        .then(exist => {
          if (exist) {
            return this.router.navigate(['/room', roomId])
          } else {
            this.inProcess = false
            this.roomDoesntExist = true;
          }
        })
        .finally(() => this.inProcess = false);
    } else {
      this.roomDoesntExist = true;
    }
  }
}
