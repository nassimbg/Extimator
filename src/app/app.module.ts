import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireAuthModule } from 'angularfire2/auth/auth.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { CardDbService } from './in-memory/in-memory-db.service';
import { AppComponent } from './app.component';
import { CardsService } from './card-service/cards.service';
import { CardsComponent } from './cards/cards.component';
import { MainComponent } from './main/main.component';
import { MaterialModule } from './material/material.module';
import { RoomComponent } from './room/room.component';
import { VoteService } from './vote-service/vote.service';
import { VotersComponent } from './voters/voters.component';
import { DisplayedVoteComponent } from './voters/displayedVote.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AuthService } from './authentication/service/Auth.service';
import { LogInComponent } from './authentication/LogIn/LogIn.component';

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
    DisplayedVoteComponent,
    LogInComponent,
    ToolbarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    NgbModule.forRoot(),
    InMemoryWebApiModule.forRoot(CardDbService),
    AngularFireModule.initializeApp(firebaseConfig),
    AppRoutingModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  providers: [CardsService, VoteService, AuthService],
})
export class AppModule {}
