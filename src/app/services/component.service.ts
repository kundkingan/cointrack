import { Injectable } from '@angular/core'

import { Observable ,  Subject } from 'rxjs'

@Injectable()
export class ComponentService {

	private userSource = new Subject<any>()
	private coinsSource = new Subject<any>()
	private loadingStatusSource = new Subject<any>()


	getUser$ = this.userSource.asObservable()
	getCoins$ = this.coinsSource.asObservable()
	getLoadingStatus$ = this.loadingStatusSource.asObservable()

	sendUser(user) {
		this.userSource.next(user)
	}

	sendCoins(coins) {
		this.coinsSource.next(coins)
	}

	sendLoadingStatus(status) {
		this.loadingStatusSource.next(status)
	}

}
