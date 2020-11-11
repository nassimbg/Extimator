import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { AuthService } from '../authentication/service/Auth.service';
import { CardsService } from './card-service/cards.service';
import { VoteService } from '../vote-service/vote.service';
import { Card } from './card';
import { Vote } from '../vote-service/vote';
import {SubscriptionHandler} from '../utils/subscription-handler';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-cards',
  styleUrls: ['./cards.component.scss'],
  templateUrl: './cards.component.html',
})
export class CardsComponent extends SubscriptionHandler implements OnInit {
  public cards: Card[];
  public selectedCard: Card;
  private userId: string;
  private cardSelected: boolean;

  @Input()
  private roomId: string;

  @Input()
  private currentStory: string;

  constructor(
    private cardsService: CardsService,
    private voteService: VoteService,
    private authService: AuthService
  ) {
    super();
  }

  public ngOnInit() {
    this.addSubscription(this.getCards());
    this.cardSelected = false;
    this.addSubscription(this.authService.getUser().subscribe((user) => (this.userId = user.id)));
  }

  private getCards(): Subscription {
    return this.cardsService.getCards().subscribe((cards) => (this.cards = cards));
  }

  onSelect($event: MouseEvent, selectedCard : Card) {
    this.cardSelected = !this.cardSelected;
    let oldSelection = this.selectedCard;

    this.selectedCard = selectedCard;

    if (this.cardSelected && oldSelection !== selectedCard) {
       this.voteService.vote(this.roomId, this.currentStory , new Vote(this.userId, this.selectedCard.id));
    } else if (!this.cardSelected) {
      this.selectedCard = undefined;
      this.voteService.unVote(this.roomId, this.currentStory, this.userId);
    }
  }

  getImage(id: number): string | undefined {
    let imageURL = this.cardsService.getImageURL(id);
    if (imageURL) {
      return `url("${imageURL}")`;
    }
  }

  getCardStyle(card: Card) {
    let image = this.getImage(card.id);

    let style = {};

    if (image) {
      style['background-image'] = image;
      return style;
    }
  }

  getStyleMetadata(card: Card) {
    let cardStyle = this.getCardStyle(card);

    let metadata = {};
    metadata['isEmpty'] = !!cardStyle;
    metadata['styles'] = cardStyle;

    return metadata;
  }
}
