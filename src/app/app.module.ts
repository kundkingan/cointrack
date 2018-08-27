import { firebaseConfig } from './../environments/firebase.config'

import * as firebase from 'firebase'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

import { MaterialModule } from './material.module'

import { AngularFireModule } from 'angularfire2'
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { AngularFireAuthModule } from 'angularfire2/auth'

import { AfDatabaseService } from './services/af-database.service'
import { AfMessagingService } from './services/af-messaging.service'
import { AfAuthService } from './services/af-auth.service'
import { ApiService } from './services/api.service'
import { ComponentService } from './services/component.service'

import { AppComponent } from './containers/app/app.component'
import { AddComponent } from './components/add/add.component'
import { MainComponent } from './containers/main/main.component'
import { NotificationComponent } from './components/notification/notification.component'
import { TutorialEffect } from './effects/main.effect'
import { NotFoundPageComponent } from './containers/not-found-page/not-found-page.component'
import { EntryComponent } from './containers/entry/entry.component'
import { LogoutComponent } from './containers/logout/logout.component'
import { AccountComponent } from './containers/account/account.component'
import { routes } from './routes'
import { UserGuard } from './user-guard'
import { reducers } from './reducers';
import { EntryLoginComponent } from './components/entry-login/entry-login.component'

firebase.initializeApp(firebaseConfig)

@NgModule({
	declarations: [
		AppComponent,
		AddComponent,
		MainComponent,
		NotificationComponent,
		NotFoundPageComponent,
		EntryComponent,
		LogoutComponent,
		AccountComponent,
		EntryLoginComponent
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
		AngularFireAuthModule,
		RouterModule.forRoot(routes),
		EffectsModule.forRoot([ TutorialEffect ]),
		StoreModule.forRoot(reducers),
		StoreDevtoolsModule.instrument({
			maxAge: 5
		})
	],
	providers: [ AfDatabaseService, ApiService, AfMessagingService, AfAuthService, ComponentService, UserGuard ],
	bootstrap: [ AppComponent ],
	entryComponents: [ AddComponent, NotificationComponent ]
})
export class AppModule {
}
