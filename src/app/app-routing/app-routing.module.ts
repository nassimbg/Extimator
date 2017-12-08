import { MainComponent } from '../main/main.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RoomComponent } from '../room/room.component';
import { LogInComponent } from '../authentication/LogIn/LogIn.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'room', component: RoomComponent },
  { path: 'logIn', component: LogInComponent },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
