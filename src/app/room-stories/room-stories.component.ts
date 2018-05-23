import { Component, OnInit, Input } from '@angular/core';
import { StoryService } from "app/story-service/story.service";
import { Story } from "app/story-service/story";
import { RoomService } from "app/room/room-service/room.service";

@Component({
  selector: 'app-room-stories',
  templateUrl: './room-stories.component.html'
})
export class RoomStoriesComponent implements OnInit {

  @Input()
  roomId: string;

  public stories: Story[];

  constructor(public storyService:StoryService, public roomService:RoomService) { }

  ngOnInit() {
    this.storyService.getStoriesFor(this.roomId).subscribe((p) => (this.stories = p));
  }

  insert(title: string){
    this.storyService.push(title, this.roomId)
  }

  changeCurrentStoryTo(storyId:string){
    this.roomService.updateCurrentStoryFor(this.roomId,storyId);
  }

}
