import {Router} from '@angular/router';
import {Component} from '@angular/core';
import {AuthService} from '../service/Auth.service';
import {UserManager} from "../../UserManagement/UserManager.service";

@Component({
  selector: 'log-in',
  styleUrls: ['./LogIn.component.css'],
  templateUrl: './LogIn.component.html',
})
export class LogInComponent {
  public error: Error;

  constructor(private authService: AuthService, private router: Router,private userManagerService: UserManager) {
  }

  public login() {
    this.authService
      .loginWithGoogle()
      .then((userData) => this.authService.getUser().subscribe(user => this.userManagerService.registerUser(user)))
      .then((data) => this.router.navigate(['']))
      .catch((error) => (this.error = error));
  }
}
