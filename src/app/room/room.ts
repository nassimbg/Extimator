export class Room {
  name: string;
  currentStory: string;

  constructor(name?: string) {
    this.name = name;
    this.currentStory = "DEFAULT_STORY";
  }
}
