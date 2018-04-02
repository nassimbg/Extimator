import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Card } from '../card';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class CardsService {
  private itemsRef: AngularFireList<any>;
  private items: Observable<Card[]>;
  private type: string;

  constructor(private af: AngularFireDatabase) {
    this.type = 'SCRUM';
    this.itemsRef = this.af.list('/CARDS/' + this.type);
    // may use snapShotChanges to get the keys also
    this.items = this.itemsRef.snapshotChanges().map((changes) => {
      return changes.map((a) => {
        const key = parseInt(a.key, 0);
        const value = a.payload.val();
        return new Card(key, value);
      });
    });
  }

  public getCards(): Observable<Card[]> {
    return this.items;
  }

  public getCardValueFor(cardId: number): Observable<string> {
    return this.items
      .map((cards) => cards.filter((card) => card.id === cardId)[0])
      .map((p) => p.title);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
