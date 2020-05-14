import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { CardsService } from './cards/card-service/cards.service';
import { CardsComponent } from './cards/cards.component';
import { MainComponent } from './main/main.component';
import { MaterialModule } from './material/material.module';
import { RoomComponent } from './room/room.component';
import { VoteService } from './vote-service/vote.service';
import { VotersComponent } from './voters/voters.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AuthService } from './authentication/service/Auth.service';
import { LogInComponent } from './authentication/LogIn/LogIn.component';
import {UserManager} from "./UserManagement/UserManager.service";
import { PickRoomComponent } from './room/create-room/pick-room.component';
import {RoomService} from "./room/room-service/room.service";
import { RoomStoriesComponent } from './room-stories/room-stories.component';
import { StoryService } from "app/story-service/story.service";
import {AngularFireModule} from "@angular/fire";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {FlexLayoutModule} from "@angular/flex-layout";
import { VotingResultComponent } from './room/room/voting-result/voting-result.component';
import {NgxEchartsModule} from "ngx-echarts";
import {HttpClientModule} from "@angular/common/http";

export const firebaseConfig = {
  apiKey: 'AIzaSyCVLNlwXVYutlM2z1i49dTG9Y85a7Z6qhg',
  authDomain: 'voting-mx.firebaseapp.com',
  databaseURL: 'https://voting-mx.firebaseio.com',
  messagingSenderId: '97661944716',
  projectId: 'voting-mx',
  storageBucket: 'voting-mx.appspot.com',
};

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    CardsComponent,
    MainComponent,
    RoomComponent,
    VotersComponent,
    VotersComponent,
    LogInComponent,
    ToolbarComponent,
    PickRoomComponent,
    RoomStoriesComponent,
    VotingResultComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AppRoutingModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FlexLayoutModule,
    NgxEchartsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [CardsService, VoteService, AuthService, UserManager, RoomService, StoryService],
})
export class AppModule {}
