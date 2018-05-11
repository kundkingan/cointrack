import { Injectable } from '@angular/core'

import { Observable } from 'rxjs/Observable'
import { Subject }    from 'rxjs/Subject'

@Injectable()
export class ComponentService {

	private userSource = new Subject<any>()
	private selectedCoinsSource = new Subject<any>()
	private loadingStatusSource = new Subject<any>()

	getUser$ = this.userSource.asObservable()
	getSelectedCoins$ = this.selectedCoinsSource.asObservable()
	getLoadingStatus$ = this.loadingStatusSource.asObservable()

	sendUser(user) {
		this.userSource.next(user)
	}

	sendSelectedCoins(coins) {
		this.selectedCoinsSource.next(coins)
	}

	sendLoadingStatus(status) {
		this.loadingStatusSource.next(status)
	}

}
