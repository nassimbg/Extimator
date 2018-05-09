import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from "angularfire2/database";
import { Story } from "app/story-service/story";

@Injectable()
export class StoryService {
  static storiesPath = '/STORIES/';
  
  
  private angularFireStories: AngularFireList<Story>;


  constructor(private af: AngularFireDatabase) {
    this.angularFireStories = this.af.list(StoryService.storiesPath);
  }

  push(story: Story, roomId: string): string {
    return this.af.list(StoryService.storiesPath + roomId).push(story).key;
  }

  getStoriesFor(roomId : string){
    return this.af.list(StoryService.storiesPath + roomId).snapshotChanges()
          .map(SnapshotActionArray => SnapshotActionArray.map(aStory => new Story(aStory.payload.val().title)));
  }
}
