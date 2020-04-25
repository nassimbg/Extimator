import {Component, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild} from '@angular/core';
import {map, mergeMap} from "rxjs/operators";
import {fromArray} from "rxjs/internal/observable/fromArray";
import {VoteService} from "../../../vote-service/vote.service";
import {CardsService} from "../../../cards/card-service/cards.service";
import * as _ from 'lodash'
import {combineLatest, Observable} from "rxjs";
import 'echarts/theme/azul.js';
import {Utils} from "../../../utils/utils";

@Component({
  selector: 'app-voting-result',
  templateUrl: './voting-result.component.html',
  styleUrls: ['./voting-result.component.scss']
})
export class VotingResultComponent implements OnInit, OnChanges {

  options: any;

  @Input()
  currentStory: string;

  @Input()
  roomId: string;

  theme: string;

  @ViewChild('chart')
  private chart : ElementRef;

  constructor(private voteService: VoteService, private cardsService: CardsService) {
    this.theme = 'azul';
  }

  ngOnChanges(changes: SimpleChanges) {
    let currentStory = changes.currentStory;

    if (currentStory?.currentValue) {
      this.voteService.getVotes(this.roomId, currentStory.currentValue)
        .pipe(
          map(votes => this.transformVotesToEChartsData(votes) ),
          mergeMap(innerObservable => innerObservable)
        ).subscribe((vote) => this.options = this.createOptions(vote));
    }
  }

  /**
   * transform an array of Vote to an array of {name: cardId, value: countPerCardId}
   */
  private transformVotesToEChartsData(votes): Observable<{[key: string] : number | string}[]> {
    return combineLatest(_(votes)
      .countBy('cardId')
      .toPairs()
      .map(pair => {
        let name = pair[0];
        let value = pair[1];
        return this.cardsService.getCardValueFor(+name)
          .pipe(map(cardName => ({name: cardName, value: value})))
      })
      .value());
  }

  ngOnInit(): void {
  }

  private createOptions(data: any) {
    // make border color as background-color
    let borderColor = getComputedStyle(this.chart.nativeElement)
      .getPropertyValue("--backgroundColor");

    let fontSize = Utils.isAtLeastMediumScreen( )? '20' : '12';

    return  {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      series: [
        {
          name: 'Results',
          type: 'pie',
          radius: "70%",
          center: ["50%", "50%"],
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: 'inside',
            fontSize: fontSize
          },
          itemStyle: {
            borderWidth: 5,
            borderColor :borderColor
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '30',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: data
        }
      ]
    };
  }
}
