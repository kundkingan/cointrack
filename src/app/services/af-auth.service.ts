import { Injectable } from '@angular/core'
import { AngularFireAuth } from 'angularfire2/auth'
import * as firebase from 'firebase/app'

@Injectable()
export class AfAuthService {

	private authState: any = null

	constructor(private afAuth: AngularFireAuth) {
		this.afAuth.authState.subscribe((auth) => this.authState = auth)
	}

	login() {
		this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
	}

	getAuthState() {
		return this.afAuth.authState
	}

	get authenticated(): boolean {
		return this.authState !== null
	}

	// Returns current user data
	get currentUser(): any {
		return this.authenticated ? this.authState : null
	}

}
