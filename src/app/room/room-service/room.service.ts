import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {AngularFireList} from "angularfire2/database/interfaces";
import {Room} from "../room";
import {Observable} from "rxjs/Observable";

@Injectable()
export class RoomService {
  static roomsPath = '/ROOMS/';
  static participant = '/PARTICIPANTS/';

  private angularFireRooms: AngularFireList<Room>;

  constructor(private af: AngularFireDatabase) {
    this.angularFireRooms = this.af.list(RoomService.roomsPath);
  }

  push(room: Room): string {
    return this.angularFireRooms.push(room).key;
  }

  findRoomName(roomId: string): Observable<string> {
    return this.af.object<Room>(RoomService.roomsPath + roomId)
      .valueChanges()
      .map(room => room.name);
  }

  addParticipant(roomId: string, userId: string) {
    this.af.list(RoomService.roomsPath + roomId + RoomService.participant)
      .set(userId, userId);
  }
}
