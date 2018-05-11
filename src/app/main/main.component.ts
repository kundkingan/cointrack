import { Component } from '@angular/core'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'

import { ApiService } from '../services/api.service'
import { AfDatabaseService } from '../services/af-database.service'
import { ComponentService } from '../services/component.service'

import { AddComponent } from '../add/add.component'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

	coins = []
	userCoins

  constructor(
  	private componentService: ComponentService,
		private apiService: ApiService,
		private dbService: AfDatabaseService,
		public dialog: MatDialog)
	{

		this.componentService.getUser$.subscribe(user => {
			if (user !== null ) {
				this.userCoins = user['coins']
				this.apiService.getTopCoins().subscribe(coins => this.handleCoins(coins['data']))
			} else {
				this.coins = []
				this.componentService.sendLoadingStatus(false)
			}
		})

	}

	setPriceColor(percent) {
		return percent >= 0 ? 'up' : 'down'
	}

	private handleCoins(coins) {
		this.coins = []
		this.componentService.sendLoadingStatus(false)
		this.userCoins.forEach(t => {
			Object.keys(coins).forEach(coin => {
				if (coins[coin]['symbol'] === t) {
					this.coins.push(coins[coin])
				}
			})
		})
	}

}
