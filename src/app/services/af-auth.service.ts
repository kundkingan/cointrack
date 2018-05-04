import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Observable, Subject } from 'rxjs';

@Injectable()
export class AfAuthService {

	private authStateSource = new Subject<any>();

	getAuthState$ = this.authStateSource.asObservable();
	userId;

	constructor(public afAuth: AngularFireAuth) {
		this.afAuth.authState.subscribe(user => this.handleAuthState(user))
	}

	login() {
		this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
	}

	private handleAuthState(user) {
		this.authStateSource.next(user);
	}

}
