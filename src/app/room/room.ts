export class Room {
  name: string;
  currentStory: string;
  facilitator: string;

  constructor(name: string, facilitator?: string) {
    this.name = name;
    this.currentStory = "DEFAULT_STORY";
    this.facilitator = facilitator;
  }
}
