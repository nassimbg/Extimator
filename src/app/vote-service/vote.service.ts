import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Vote } from './vote';

@Injectable()
export class VoteService {

  constructor(private af: AngularFireDatabase) {
  }

  public vote(roomId: string, vote: Vote): void {
    this.af.object(`/ROOMS/${roomId}/estimations/story1/votes/${vote.userID}`)
      .set(vote.cardId)
      .catch(VoteService.handleError);
  }

  public getVotes(roomId: string): Observable<Vote[]> {
    return this.af.list(`/ROOMS/${roomId}/estimations/story1/votes/`)
      .snapshotChanges()
      .map(SnapshotActionArray => SnapshotActionArray.map(vot => new Vote(vot.payload.key, vot.payload.val())));
  }

  private static handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
