import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Vote } from '../voters/vote';

@Injectable()
export class VoteService {
  private itemsRef: AngularFireList<any>;
  private items: Observable<Vote[]>;

  constructor(private af: AngularFireDatabase) {
    this.itemsRef = this.af.list('/Room/estimations/estimationUID1/votes');
    // may use snapShotChanges to get the keys also
    this.items = this.itemsRef.valueChanges();
  }

  public vote(vote: Vote): void {
    // check this to reach children
    // or find a way to use the query
    // this.items.$ref.ref.child()
    this.itemsRef.set(vote.userID, vote).catch(this.handleError);
  }

  public getVotes(): Observable<Vote[]> {
    return this.items;
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
