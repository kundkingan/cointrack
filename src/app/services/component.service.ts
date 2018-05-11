import { Injectable } from '@angular/core'

import { Observable } from 'rxjs/Observable'
import { Subject }    from 'rxjs/Subject'

@Injectable()
export class ComponentService {

	private userSource = new Subject<any>()
	private avilableCoinsSource = new Subject<any>()
	private selectedCoinsSource = new Subject<any>()

	getUser$ = this.userSource.asObservable()
	getAvailableCoins$ = this.avilableCoinsSource.asObservable()
	getSelectedCoins$ = this.selectedCoinsSource.asObservable()

	sendUser(user) {
		this.userSource.next(user)
	}

	sendAvailableCoins(coins) {
		this.avilableCoinsSource.next(coins)
	}

	sendSelectedCoins(coins) {
		this.selectedCoinsSource.next(coins)
	}

}
