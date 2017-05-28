import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap';
import { CardDbService } from 'app/in-memory/in-memory-db.service';
import { CardsComponent } from './cards/cards.component';
import {CardsService} from './card-service/cards.service';


@NgModule({
  declarations: [
    AppComponent,
    CardsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AlertModule.forRoot(),
    InMemoryWebApiModule.forRoot(CardDbService)
  ],
  providers: [CardsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
