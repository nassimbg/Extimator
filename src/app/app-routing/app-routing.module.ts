import { MainComponent } from '../main/main.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RoomComponent } from '../room/room.component';
import { LogInComponent } from '../authentication/LogIn/LogIn.component';
import {CreateRoomComponent} from "../room/create-room/create-room.component";
import {AuthGuard} from "../authentication/auth.guard";

const routes: Routes = [
  { path: 'room/:id', component: RoomComponent, canActivate: [AuthGuard] },
  { path: 'logIn', component: LogInComponent },
  { path: 'create-room', component: CreateRoomComponent },
  { path: '', component: MainComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
