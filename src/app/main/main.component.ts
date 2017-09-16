import {
  AuthService
} from '../authentication/service/Auth.service';
import {
  print
} from 'util';
import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  name: String;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getUser().subscribe(user => {
      if (user == null) {
        this.name = null;
      } else {
        this.name = user.displayName
      }
    });
  }
}
