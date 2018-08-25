import { firebaseConfig } from './../environments/firebase.config';

import * as firebase from 'firebase';
firebase.initializeApp(firebaseConfig);

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AfDatabaseService } from './services/af-database.service';
import { AfMessagingService } from './services/af-messaging.service';
import { AfAuthService } from './services/af-auth.service';
import { ApiService } from './services/api.service';
import { ComponentService } from './services/component.service';

import { AppComponent } from './app.component';
import { AddComponent } from './add/add.component';
import { MainComponent } from './main/main.component';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    MainComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [AfDatabaseService, ApiService, AfMessagingService, AfAuthService, ComponentService],
  bootstrap: [AppComponent],
  entryComponents: [AddComponent, NotificationComponent]
})
export class AppModule { }
