import { VoteService } from '../vote-service/vote.service';
import { CardsService } from '../card-service/cards.service';
import { Component, OnInit } from '@angular/core';
import { Vote } from 'app/voters/vote';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-voters',
  templateUrl: './voters.component.html',
  styleUrls: ['./voters.component.css']
})
export class VotersComponent implements OnInit {

  votes: Vote[];
  value:string;

  
  constructor(private voteService: VoteService, private cardsService : CardsService) {
     
  }

  ngOnInit() {
    this.voteService.getVotes().subscribe(p => this.votes = p);
    console.log(this.votes);
  }

   public getCardValue(cardId : number):Observable<String>{
      return this.cardsService.getCardValueFor(cardId);
    }
}
