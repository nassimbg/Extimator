import { MainComponent } from '../main/main.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RoomComponent } from '../room/room.component';
import { LogInComponent } from '../authentication/LogIn/LogIn.component';
import {PickRoomComponent} from "../room/create-room/pick-room.component";
import {AuthGuard} from "../authentication/auth.guard";

const routes: Routes = [
  { path: 'room/:id', component: RoomComponent, canActivate: [AuthGuard] },
  { path: 'logIn', component: LogInComponent },
  { path: 'create-room', component: PickRoomComponent },
  { path: '', component: MainComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
