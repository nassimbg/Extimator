import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from '../service/Auth.service';

@Component({
  selector: 'log-in',
  styleUrls: ['./LogIn.component.css'],
  templateUrl: './LogIn.component.html',
})
export class LogInComponent {
  public error: Error;

  constructor(private authService: AuthService, private router: Router) {}

  public login() {
    this.authService
      .loginWithGoogle()
      .then((data) => this.router.navigate(['']))
      .catch((error) => (this.error = error));
  }
}
