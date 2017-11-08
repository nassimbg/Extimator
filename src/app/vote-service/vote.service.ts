import {
  Injectable
} from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList
} from 'angularfire2/database';
import {
  Vote
} from 'app/voters/vote';
import {
  Observable
} from 'rxjs/Observable';

@Injectable()
export class VoteService {
  itemsRef: AngularFireList<any>;
  items: Observable<Vote[]>;

  constructor(private af: AngularFireDatabase) {
    this.itemsRef = this.af.list('/Room/estimations/estimationUID1/votes');
    // may use snapShotChanges to get the keys also
    this.items = this.itemsRef.valueChanges()

  }

  vote(vote: Vote): void {
    // check this to reach children
    // or find a way to use the query
    // this.items.$ref.ref.child()
    this.itemsRef.set(vote.userID, vote)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred when voting', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getVotes(): Observable<Vote[]> {
    return this.items;
  }
}
