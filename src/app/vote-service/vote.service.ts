import {
  Injectable,
  OnInit
} from '@angular/core';
import {
  AngularFireDatabase,
  FirebaseListObservable
} from 'angularfire2/database';
import {
  Vote
} from 'app/voters/vote';
import {
  Observable
} from 'rxjs/Observable';

@Injectable()
export class VoteService {
  items: FirebaseListObservable < any[] > ;

  constructor(private af: AngularFireDatabase) {
    // this.af.database.ref().child().orderByChild()
    // this.af.database.ref().on()
    this.items = this.af.list('/votes', {
      query: {
        limitToLast: 50
      }
    });

  }

  vote(vote: Vote): void {
    // check this to reach children
    // or find a way to use the query
    // this.items.$ref.ref.child()
    this.items.update(vote.name, vote)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise < any > {
    console.error('An error occurred when voting', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getVotes(): Observable < Vote[] > {
    return this.items;
  }



}
