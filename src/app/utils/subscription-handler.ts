import {OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

export class SubscriptionHandler implements OnDestroy {

  private subscription: Subscription = new Subscription();

  addSubscription(subscription: Subscription) {
    this.subscription.add(subscription);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
