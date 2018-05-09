import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Vote } from './vote';

@Injectable()
export class VoteService {

  private static DEFAULT_STORY_NAME = "story1";
  private static VOTES_PATH = "VOTES";
  private static STORIES_PATH = "STORIES";
  private static ESTIMATIONS_PATH = "ESTIMATIONS";
  private static VOTING_STATUS_PATH = "VOTING-STATUS";

  constructor(private af: AngularFireDatabase) {
  }

  public setVotingStatues(roomId: string, votingEnabled: boolean) {
    this.getVotingStatusObserver(roomId)
      .set(votingEnabled)
      .catch(VoteService.handlePromiseError);
  }

  public getVotingStatues(roomId: string): Observable<any> {
    return this.getVotingStatusObserver(roomId)
      .valueChanges();
  }

  private getVotingStatusObserver(roomId: string) {
    return this.af.object( `${VoteService.getRoomVotingURL(roomId)}/${VoteService.VOTING_STATUS_PATH}`);
  }

  public vote(roomId: string, storyId:string, vote: Vote): void {
    this.af.object(VoteService.getEstimationURL(roomId,storyId,  vote.userID))
      .set(vote.cardId)
      .catch(VoteService.handlePromiseError);
  }

  public getVotes(roomId: string): Observable<Vote[]> {
    return this.af.list(VoteService.getEstimationURL(roomId,VoteService.DEFAULT_STORY_NAME, ''))
      .snapshotChanges()
      .map(SnapshotActionArray => SnapshotActionArray.map(vot => new Vote(vot.payload.key, vot.payload.val())));
  }

  private static handlePromiseError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

  private static getRoomVotingURL(roomId: string) {
    return `/${VoteService.ESTIMATIONS_PATH}/${roomId}`;
  }

  private static getEstimationURL(roomId: string, storyId: string, userId: string): string {
    return `${VoteService.getRoomVotingURL(roomId)}/${VoteService.STORIES_PATH}/${storyId}/${VoteService.VOTES_PATH}/${userId}`;
  }
}
