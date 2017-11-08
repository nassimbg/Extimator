import { Card } from '../card/card';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";

@Injectable()
export class CardsService {
  itemsRef: AngularFireList<any>;
  items: Observable<Card[]>;
  type: string;

  constructor(private af: AngularFireDatabase) {
    this.type = 'SCRUM';
    this.itemsRef = this.af.list('/CARDS/' + this.type);
    // may use snapShotChanges to get the keys also
    this.items = this.itemsRef.snapshotChanges().map(changes =>{ return changes.map(
      a => {
        const key = parseInt(a.key);
        const value = a.payload.val();
        return new Card(key, value)
      }
    )
    });
  }

  getCards(): Observable<Card[]> {
    return this.items;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  public getCardValueFor(cardId: number): Observable<string> {
      return this.items
        .map( cards => cards.filter(card => card.id === cardId)[0])
        .map(p => p.title)
  }
}
