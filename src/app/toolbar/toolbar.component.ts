import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../authentication/service/Auth.service';

@Component({
  selector: 'app-toolbar',
  styleUrls: ['./toolbar.component.css'],
  templateUrl: './toolbar.component.html',
})
export class ToolbarComponent implements OnInit {
  public isLoggedIn: boolean;
  public LogInStatus: string;

  constructor(private authService: AuthService, private router: Router) {}

  public ngOnInit() {
    this.authService.getUser().subscribe((user) => {
      if (user == null) {
        this.LogInStatus = 'Log In';
        this.isLoggedIn = false;
      } else {
        this.isLoggedIn = true;
        this.LogInStatus = 'Log Out';
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
