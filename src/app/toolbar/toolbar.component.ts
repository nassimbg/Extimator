import {Component, HostListener, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../authentication/service/Auth.service';
import {Utils} from '../utils/utils';
import {SubscriptionHandler} from '../utils/subscription-handler';

@Component({
  selector: 'app-toolbar',
  styleUrls: ['./toolbar.component.scss'],
  templateUrl: './toolbar.component.html',
})
export class ToolbarComponent extends SubscriptionHandler implements OnInit {
  public isLoggedIn: boolean;
  public profileImageUrl: string;
  isXSmallScreen: boolean;

  constructor(private authService: AuthService, private router: Router) {
    super();
  }

  public ngOnInit() {
    this.isXSmallScreen = !Utils.isAtLeastSmallScreen();

    this.addSubscription(this.authService.getUser().subscribe((user) => {
      if (user == null) {
        this.profileImageUrl = 'assets/images/ic_account_circle_white_48px.svg';
        this.isLoggedIn = false;
      } else {
        this.isLoggedIn = true;
        this.profileImageUrl = user.photoURL;
      }
    }));
  }

  public logIn() {
    if (!this.isLoggedIn) {
      this.router.navigate(['logIn']);
    }
  }

  public logOut() {
    this.authService.logOut().then((value) => this.goToMain());
  }


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.isXSmallScreen = event.target.innerWidth < Utils.getMinSmallScreenSize();
  }

  createRoom() {
    this.router.navigate(['create-room']);
  }

  goToMain() {
    this.router.navigate(['']);
  }
}
