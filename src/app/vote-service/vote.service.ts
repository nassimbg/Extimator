import { Injectable } from '@angular/core';
import { Vote } from './vote';
import {AngularFireDatabase} from "@angular/fire/database";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {strict} from "assert";
import {Utils} from "../utils/utils";

@Injectable()
export class VoteService {

  private static VOTES_PATH = "VOTES";
  private static STORIES_PATH = "STORIES";
  private static ESTIMATIONS_PATH = "ESTIMATIONS";
  private static VOTING_STATUS_PATH = "VOTING-STATUS";

  constructor(private af: AngularFireDatabase) {
  }

  public setVotingStatues(roomId: string, votingEnabled: boolean) {
    this.getVotingStatusObserver(roomId)
      .set(votingEnabled)
      .catch(Utils.handlePromiseError);
  }

  public getVotingStatues(roomId: string): Observable<any> {
    return this.getVotingStatusObserver(roomId)
      .valueChanges();
  }

  public vote(roomId: string, storyId:string, vote: Vote): void {
    this.af.object(VoteService.getEstimationURL(roomId,storyId,  vote.userID))
      .set(vote.cardId)
      .catch(Utils.handlePromiseError);
  }

  public getVotes(roomId: string, currentStory: string): Observable<Vote[]> {
    return this.af.list<number>(VoteService.getEstimationURL(roomId, currentStory, ''))
      .snapshotChanges()
      .pipe(map(SnapshotActionArray => SnapshotActionArray.map(vot => new Vote(vot.payload.key, vot.payload.val()))));
  }

  resetVotes(roomId: string, currentStory: string) {
    this.af.object(VoteService.getStoryInRoomURL(roomId, currentStory))
      .remove()
      .catch(Utils.handlePromiseError);
  }

  private getVotingStatusObserver(roomId: string) {
    return this.af.object( `${VoteService.getRoomVotingURL(roomId)}/${VoteService.VOTING_STATUS_PATH}`);
  }

  private static getRoomVotingURL(roomId: string) {
    return `/${VoteService.ESTIMATIONS_PATH}/${roomId}`;
  }

  private static getStoryInRoomURL(roomId: string, storyId: string) {
    return `${VoteService.getRoomVotingURL(roomId)}/${VoteService.STORIES_PATH}/${storyId}/${VoteService.VOTES_PATH}/`;
  }

  private static getEstimationURL(roomId: string, storyId: string, userId: string): string {
    return `${VoteService.getStoryInRoomURL(roomId, storyId)}${userId}`;
  }
}
