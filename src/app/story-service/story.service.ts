import { Injectable } from '@angular/core';
import { Story } from "app/story-service/story";
import {AngularFireDatabase, AngularFireList} from "@angular/fire/database";
import {map} from "rxjs/operators";

@Injectable()
export class StoryService {
  static storiesPath: string = '/STORIES/';

  private angularFireStories: AngularFireList<Story>;


  constructor(private af: AngularFireDatabase) {
    this.angularFireStories = this.af.list(StoryService.storiesPath);
  }

  push(storyTitle: string, roomId: string): string {
    return this.af.list(StoryService.storiesPath + roomId).push(storyTitle).key;
  }

  getStoriesFor(roomId: string) {
    return this.af.list(StoryService.storiesPath + roomId)
      .snapshotChanges()
      // @ts-ignore
      .pipe(map(SnapshotActionArray => SnapshotActionArray.map(aStory => new Story(aStory.key,aStory.payload.val().title))));
  }
}
