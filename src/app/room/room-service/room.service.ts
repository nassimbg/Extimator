import { Injectable } from '@angular/core';
import { Room } from "../room";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {AngularFireDatabase, AngularFireList} from "@angular/fire/database";
import {Utils} from '../../utils/utils';

@Injectable()
export class RoomService {
  static roomsPath = '/ROOMS/';
  static participant = '/PARTICIPANTS/';
  static facilitator = '/facilitator/';

  private angularFireRooms: AngularFireList<Room>;

  constructor(private af: AngularFireDatabase) {
    this.angularFireRooms = this.af.list(RoomService.roomsPath);
  }

  push(room: Room): string {
    return this.angularFireRooms.push(room).key;
  }

  doesRoomExist(roomId: string): Promise<boolean> {
    return this.af.database.ref(RoomService.roomsPath + roomId)
      .once('value')
      .then(t => t.exists())
      .catch(error => Utils.handlePromiseError(error));
  }

  addParticipant(roomId: string, userId: string) {
    this.getParticipantsList(roomId)
      .set(userId, userId);
  }

  private getParticipantsList(roomId: string): AngularFireList<string> {
    return this.af.list(RoomService.roomsPath + roomId + RoomService.participant);
  }

  getParticipants(roomId: string): Observable<string[]> {
    return this.getParticipantsList(roomId).valueChanges();
  }

  getFacilitator(roomId: string): Observable<any> {
    return this.af.object(RoomService.roomsPath + roomId + RoomService.facilitator).valueChanges();
  }

  getAllRooms(): Observable<any[]> {
    return this.angularFireRooms
      .snapshotChanges()
      .pipe(map(snapshotChange => snapshotChange.map(room => [room.key, room.payload.val().name])))
  }

  currentStory(roomId: string): Observable<any> {
    return this.af.object(RoomService.roomsPath + roomId + "/currentStory").valueChanges();
  }

  updateCurrentStoryFor(roomId:string, storyId:string){
    this.af.list(RoomService.roomsPath + roomId).set("currentStory", storyId)
  }
}
