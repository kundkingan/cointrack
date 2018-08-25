import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'

import { AfAuthService } from './services/af-auth.service'

@Injectable()
export class UserGuard implements CanActivate {

	constructor(
		private afAuthService: AfAuthService,
		private router: Router
	) {
	}

	canActivate(): boolean {
		if (!this.afAuthService.authenticated) {
			this.router.navigate([ '/' ])
			return false
		} else
			return true
	}

}
