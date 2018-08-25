import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable()
export class ApiService {

	// COIN_URL = 'https://min-api.cryptocompare.com/data/'
	// COINS = 'ETH,BTC,XLM,XRP'
	// CURRENCY = 'BTC,USD,EUR'

	// url = this.COIN_URL + 'pricemulti?fsyms=' + this.COINS + '&tsyms=' + this.CURRENCY

	coinMarket = 'https://api.coinmarketcap.com/v2/ticker/?start=0&limit=10'

	constructor(private http: HttpClient) {
	}

	// getBasicCoins() {
	// 	return this.http.get(this.url)
	// }

	getTopCoins() {
		return this.http.get(this.coinMarket)
	}

}
