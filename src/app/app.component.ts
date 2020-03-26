import { Component } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";

@Component({
  providers: [AngularFireAuth],
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',
})
export class AppComponent {}
