import { Injectable } from '@angular/core';
import { Card } from '../card';

import {AngularFireDatabase, AngularFireList} from "@angular/fire/database";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable()
export class CardsService {
  private static IMAGE_URL_PREFIX  = './assets/images/cards';

  private itemsRef: AngularFireList<any>;
  private readonly items: Observable<Card[]>;
  private readonly type: string;
  private readonly imageNames: Map<number, string>;

  constructor(private af: AngularFireDatabase) {
    this.imageNames = new Map()
      .set(-1, "Cover")
      .set(1,"Half")
      .set(2,1)
      .set(3,2)
      .set(4,3)
      .set(5,5)
      .set(6,8)
      .set(7,13)
      .set(8,20)
      .set(9,40)
      .set(10,100)
      .set(11, 'Coffee')
      .set(12, 'INFINITY')
      .set(13, 'QM');
    this.type = 'SCRUM';
    this.itemsRef = this.af.list('/CARDS/' + this.type);
    // may use snapShotChanges to get the keys also
    this.items = this.itemsRef.snapshotChanges().pipe(map((changes) => {
      return changes.map((a) => {
        const key = parseInt(a.key, 0);
        const value = a.payload.val();
        return new Card(key, value);
      });
    }));
  }

  public getCards(): Observable<Card[]> {
    return this.items;
  }

  public getCardValueFor(cardId: number): Observable<string> {
    return this.items
      .pipe(
        map((cards) => cards.filter((card) => card.id === cardId)[0]),
        map((p) => p.title)
      );
  }

  public getImageURL(carId: number): string | undefined {
    let imageName = this.imageNames.get(carId);

    if (imageName) {
      return `${CardsService.IMAGE_URL_PREFIX}/${this.type.toLowerCase()}/${imageName}.png`;
    }
  }
}
