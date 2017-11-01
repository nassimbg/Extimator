import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { CardDbService } from 'app/in-memory/in-memory-db.service';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { CardsService } from './card-service/cards.service';
import { CardsComponent } from './cards/cards.component';
import { MainComponent } from './main/main.component';
import { MaterialModule } from './material/material.module';
import { RoomComponent } from './room/room.component';
import { VoteService } from 'app/vote-service/vote.service';
import { VotersComponent } from './voters/voters.component';
import { SimpleTimer } from 'ng2-simple-timer';
import { DisplayedVote } from "app/voters/displayedVote.component";

export const firebaseConfig = {
  apiKey: "AIzaSyCVLNlwXVYutlM2z1i49dTG9Y85a7Z6qhg",
  authDomain: "voting-mx.firebaseapp.com",
  databaseURL: "https://voting-mx.firebaseio.com",
  projectId: "voting-mx",
  storageBucket: "voting-mx.appspot.com",
  messagingSenderId: "97661944716"
};

@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    MainComponent,
    RoomComponent,
    VotersComponent,
    VotersComponent,
    DisplayedVote
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
  ],
  providers: [CardsService, VoteService, SimpleTimer],
  bootstrap: [AppComponent]
})
export class AppModule { }
