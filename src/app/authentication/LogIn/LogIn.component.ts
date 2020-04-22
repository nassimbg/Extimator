import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {Component} from '@angular/core';
import {AuthService} from '../service/Auth.service';
import {UserManager} from "../../UserManagement/UserManager.service";

@Component({
  selector: 'log-in',
  styleUrls: ['./LogIn.component.scss'],
  templateUrl: './LogIn.component.html',
})
export class LogInComponent {
  public error: Error;

  constructor(private authService: AuthService, private router: Router) {
  }

  public login() {
    this.authService
      .loginWithGoogle()
      .then((data) => this.router.navigate([this.authService.redirectUrl]))
      .catch((error) => (this.error = error));
  }
}
