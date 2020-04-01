import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../authentication/service/Auth.service';

@Component({
  selector: 'app-toolbar',
  styleUrls: ['./toolbar.component.scss'],
  templateUrl: './toolbar.component.html',
})
export class ToolbarComponent implements OnInit {
  public isLoggedIn: boolean;
  public profileImageUrl: string;

  constructor(private authService: AuthService, private router: Router) {}

  public ngOnInit() {
    this.authService.getUser().subscribe((user) => {
      if (user == null) {
        this.profileImageUrl = 'assets/images/ic_account_circle_white_48px.svg';
        this.isLoggedIn = false;
      } else {
        this.isLoggedIn = true;
        this.profileImageUrl = user.photoURL;
      }
    });
  }

  public logIn() {
    if (this.isLoggedIn) {
      this.authService.logOut().then((value) => this.router.navigate(['']));
    } else {
      this.router.navigate(['logIn']);
    }
  }
}
