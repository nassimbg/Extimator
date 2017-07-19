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

export const firebaseConfig = {
  apiKey: 'AIzaSyCLDrCqruQGe9wSdjE7bxd_yn4Xgr1qTi0',
  authDomain: 'extimator-4faf2.firebaseapp.com',
  databaseURL: 'https://extimator-4faf2.firebaseio.com',
  projectId: 'extimator-4faf2',
  storageBucket: 'extimator-4faf2.appspot.com',
  messagingSenderId: '123216614544'
};

@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    MainComponent,
    RoomComponent,
    VotersComponent,
    VotersComponent
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
    AngularFireDatabaseModule
  ],
  providers: [CardsService, VoteService, SimpleTimer],
  bootstrap: [AppComponent]
})
export class AppModule { }
