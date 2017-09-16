import { error } from 'util';
import {Router} from '@angular/router';
import { AuthService } from '../service/Auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'log-in',
  templateUrl: './LogIn.component.html',
  styleUrls: ['./LogIn.component.css']
})
export class LogInComponent implements OnInit {
  error: Error;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authService.loginWithGoogle()
    .then((data) => this.router.navigate(['']))
    .catch(error => this.error = error);
  }
}
