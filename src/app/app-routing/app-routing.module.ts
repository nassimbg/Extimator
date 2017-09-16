import {MainComponent} from '../main/main.component';
import {RouterModule, Routes} from '@angular/router';
import * as path from 'path';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomComponent } from 'app/room/room.component';
import { LogInComponent } from 'app/authentication/LogIn/LogIn.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'room', component: RoomComponent },
  {path: 'logIn', component: LogInComponent }
];

@NgModule({
  imports: [
     RouterModule.forRoot(routes)
  ],
exports: [RouterModule]
})
export class AppRoutingModule { }