import { firebaseConfig } from './../environments/firebase.config';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { AddComponent } from './add/add.component';

import { AfDatabaseService } from './services/af-database.service';
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
    HttpClientModule,
    HttpModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [AfDatabaseService, ApiService],
  bootstrap: [AppComponent],
  entryComponents: [AddComponent]
})
export class AppModule { }
