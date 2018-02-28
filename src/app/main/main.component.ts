import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authentication/service/Auth.service';

@Component({
  selector: 'app-main',
  styleUrls: ['./main.component.css'],
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit {
  public name: string;

  constructor(private authService: AuthService) {}

  public ngOnInit() {
    this.authService.getUser().subscribe((user) => {
      this.name = !!user ? user.name : null;
    });
  }
}
