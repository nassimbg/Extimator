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

  addParticipant(roomId: string, userId: string) {
    this.af.list(RoomService.roomsPath + roomId + RoomService.participant)
      .set(userId, userId);
  }

  getAllRooms(): Observable<any[]> {
    return this.angularFireRooms
      .snapshotChanges()
      .map(snapshotChange => snapshotChange.map(room => [room.key, room.payload.val().name]))
  }
}
