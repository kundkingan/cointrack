import { environment } from '../environments/environment';
import { firebaseConfig } from '../environments/firebase.config';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { AddComponent } from './add/add.component';

import { AfDatabaseService } from './services/af-database.service';
import { AfMessagingService } from './services/af-messaging.service';
import { ApiService } from './services/api.service';

import * as firebase from 'firebase';
firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    AddComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    HttpClientModule,
    MaterialModule
  ],
  providers: [AfDatabaseService, ApiService, AfMessagingService],
  bootstrap: [AppComponent],
  entryComponents: [AddComponent]
})
export class AppModule { }
