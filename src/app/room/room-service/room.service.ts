import { Injectable } from '@angular/core';
import { Room } from "../room";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {AngularFireDatabase, AngularFireList} from "@angular/fire/database";

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
    this.getParticipantsList(roomId)
      .set(userId, userId);
  }

  private getParticipantsList(roomId: string): AngularFireList<string> {
    return this.af.list(RoomService.roomsPath + roomId + RoomService.participant);
  }

  getParticipants(roomId: string): Observable<string[]> {
    return this.getParticipantsList(roomId).valueChanges();
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
