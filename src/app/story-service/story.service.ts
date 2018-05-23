import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from "angularfire2/database";
import { Story } from "app/story-service/story";
import { Observable } from "rxjs/Observable";

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
    return this.af.list(StoryService.storiesPath + roomId).snapshotChanges()
      .map(SnapshotActionArray => SnapshotActionArray.map(aStory => new Story(aStory.key,aStory.payload.val().title)));
  }
}
