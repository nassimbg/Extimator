import { VoteService } from '../vote-service/vote.service';

import { Component, OnInit } from '@angular/core';
import { Vote } from 'app/voters/vote';

@Component({
  selector: 'app-voters',
  templateUrl: './voters.component.html',
  styleUrls: ['./voters.component.css']
})
export class VotersComponent implements OnInit {

  votes: Vote[];
  constructor(private voteService: VoteService) { }

  ngOnInit() {
    this.voteService.getVotes().subscribe(p => this.votes = p);
  }
}
