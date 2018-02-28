export class Vote {
  userID: string;
  cardId: number;

  constructor(userID: string, cardId: number) {
    this.userID = userID;
    this.cardId = cardId;
  }
}
