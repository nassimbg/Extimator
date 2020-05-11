import { Component, OnInit, Input } from '@angular/core';
import { StoryService } from "app/story-service/story.service";
import { Story } from "app/story-service/story";
import { RoomService } from "app/room/room-service/room.service";
import {SubscriptionHandler} from '../utils/subscription-handler';

@Component({
  selector: 'app-room-stories',
  styleUrls: ['./room-stories.component.scss'],
  templateUrl: './room-stories.component.html'
})
export class RoomStoriesComponent extends SubscriptionHandler implements OnInit {

  @Input()
  roomId: string;

  public stories: Story[];
  public currentStoryId: string;

  constructor(public storyService:StoryService, public roomService:RoomService) {
    super();
  }

  ngOnInit() {
    this.addSubscription(this.storyService.getStoriesFor(this.roomId).subscribe((p) => (this.stories = p)));
  }

  insert(title: string){
    this.storyService.push(title, this.roomId)
  }

  changeCurrentStoryTo(storyId:string){
    this.roomService.updateCurrentStoryFor(this.roomId,storyId);
    this.toggleFocus(storyId);
  }

  toggleFocus(storyId: string){
    this.currentStoryId = storyId;
  }

}
