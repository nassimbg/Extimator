import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authentication/service/Auth.service';
import {SubscriptionHandler} from '../utils/subscription-handler';

@Component({
  selector: 'app-main',
  styleUrls: ['./main.component.scss'],
  templateUrl: './main.component.html',
})
export class MainComponent extends SubscriptionHandler implements OnInit {
  public name: string;

  constructor(private authService: AuthService) {
    super();
  }

  public ngOnInit() {
    this.addSubscription(this.authService.getUser().subscribe((user) => {
      this.name = !!user ? user.name : null;
    }));
  }
}
