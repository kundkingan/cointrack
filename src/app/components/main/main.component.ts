// import { Component } from '@angular/core'
// import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
//
// import { ApiService } from '../../services/api.service'
// import { AfDatabaseService } from '../../services/af-database.service'
// import { ComponentService } from '../../services/component.service'
//
// import { AddComponent } from '../add/add.component'
//
// @Component({
//   selector: 'app-main',
//   templateUrl: './main.component.html',
//   styleUrls: ['./main.component.scss']
// })
// export class MainComponent {
//
// 	coins = []
// 	newCoins = []
// 	showText = false
//
//   constructor(
//   	private componentService: ComponentService,
// 		private apiService: ApiService,
// 		private dbService: AfDatabaseService,
// 		public dialog: MatDialog)
// 	{
// 		this.componentService.getCoins$.subscribe(coins => {
// 			this.newCoins = coins
// 			this.apiService.getTopCoins().subscribe(coinsStatus => this.handleCoinsStatus(coinsStatus['data']))
// 		})
// 	}
//
// 	setPriceColor(percent) {
// 		return percent >= 0 ? 'up' : 'down'
// 	}
//
// 	private handleCoinsStatus(coinsStatus) {
// 		this.coins = []
// 		this.componentService.sendLoadingStatus(false)
// 		if (this.newCoins) {
// 			this.newCoins.forEach(t => {
// 				Object.keys(coinsStatus).forEach(coin => {
// 					if (coinsStatus[coin]['symbol'] === t) {
// 						this.coins.push(coinsStatus[coin])
// 					}
// 				})
// 			})
// 		}
// 		this.showText = this.coins.length > 0 ? false : true
// 	}
//
// }
