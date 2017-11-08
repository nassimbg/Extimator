import { Card } from '../card/card';
import { Injectable } from '@angular/core';
import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CardsService {
  private cardsUrl = 'api/cards';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getCards(): Promise<Card[]> {
    return this.http.get(this.cardsUrl)
      .toPromise()
      .then(p => p.json().data as Card[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  public getCardValueFor(cardId: number): Observable<string> {
      return this.http.get(this.cardsUrl + '/' + cardId)
      .map(p => p.json().data.title as string);
  }
}
