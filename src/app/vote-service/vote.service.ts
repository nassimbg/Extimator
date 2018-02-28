import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Vote } from './vote';

@Injectable()
export class VoteService {
  private itemsRef: AngularFireList<any>;
  private items: Observable<Vote[]>;

  constructor(private af: AngularFireDatabase) {
    this.itemsRef = this.af.list('/Room/estimations/estimationUID1/votes');

    this.items = this.itemsRef.snapshotChanges()
      .map(SnapshotActionArray => SnapshotActionArray.map(vot => new Vote(vot.payload.key, vot.payload.val())));
  }

  public vote(vote: Vote): void {
    this.itemsRef.set(vote.userID, vote.cardId)
      .catch(VoteService.handleError);
  }

  public getVotes(): Observable<Vote[]> {
    return this.items;
  }

  private static handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
