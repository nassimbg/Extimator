
import {InMemoryDbService} from 'angular-in-memory-web-api';

export class CardDbService implements InMemoryDbService {
  createDb() {
    let cards = [
      {id: 0, title: '0'},
      {id: 1, title: '0.5'},
      {id: 2, title: '1'},
      {id: 3, title: '2'},
      {id: 4, title: '3'},
      {id: 5, title: '5'},
      {id: 6, title: '8'},
      {id: 7, title: '13'},
      {id: 8, title: '20'},
      {id: 9, title: '40'},
      {id: 10, title: '100'},
      {id: 11, title: 'coffee break!'},
      {id: 12, title: 'infinity'},
      {id: 13, title: '?'}
    ];

    return {cards};
  }
}
