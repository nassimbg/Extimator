import {Router} from '@angular/router';
import { AuthService } from '../authentication/service/Auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  isLoggedIn: boolean;
  LogInStatus: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.getUser().subscribe(user => {
      if (user == null) {
        this.LogInStatus = 'Log In';
        this.isLoggedIn = false;
      } else {
        this.isLoggedIn = true;
        this.LogInStatus = 'Log Out';
      }
    })
  }

  logIn() {
    if (this.isLoggedIn) {
      this.authService.logOut().then(value => this.router.navigate(['']));
    } else {
      this.router.navigate(['logIn']);
    }
  }

}
