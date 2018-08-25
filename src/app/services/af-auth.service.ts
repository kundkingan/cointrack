import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Observable ,  Subject } from 'rxjs';

@Injectable()
export class AfAuthService {

	constructor(private afAuth: AngularFireAuth) {}

	login() {
		this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
	}

	getAuthState() {
		return this.afAuth.authState
	}


}
