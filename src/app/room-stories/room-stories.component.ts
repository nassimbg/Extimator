import { Component, OnInit, Input } from '@angular/core';
import { StoryService } from "app/story-service/story.service";
import { Story } from "app/story-service/story";

@Component({
  selector: 'app-room-stories',
  templateUrl: './room-stories.component.html'
})
export class RoomStoriesComponent implements OnInit {

  @Input()
  roomId: string;

  constructor(public storyService:StoryService) { }

  ngOnInit() {
  }

  insert(title: string){
    this.storyService.push(new Story(title), this.roomId)
  }
}
