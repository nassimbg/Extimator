import {Component, Input, OnInit} from '@angular/core';
import { VoteService } from '../vote-service/vote.service';
import { Vote } from '../vote-service/vote';

@Component({
  selector: 'app-voters',
  styleUrls: ['./voters.component.css'],
  templateUrl: './voters.component.html',
})
export class VotersComponent implements OnInit {
  public votes: Vote[];

  @Input()
  private roomId: string;

  constructor(private voteService: VoteService) {}

  public ngOnInit() {
    this.voteService.getVotes(this.roomId).subscribe((p) => (this.votes = p));
  }
}
