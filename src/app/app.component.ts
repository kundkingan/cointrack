import { Component } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { AddComponent } from './add/add.component';
import { LoginComponent } from './login/login.component';
import { ApiService } from './services/api.service';
import { AfDatabaseService } from './services/af-database.service';
import { AfMessagingService } from './services/af-messaging.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {

	coins = []
	trackedCoins;

	constructor(
		private apiService: ApiService,
		private dbService: AfDatabaseService,
		private msgService: AfMessagingService,
		public dialog: MatDialog)
	{
		this.msgService.setupMessaging();
		this.msgService.setupNotification()
		this.dbService.getTrackedCoins().subscribe(trackedCoins => {
			this.trackedCoins = trackedCoins
			this.apiService.getTopCoins().subscribe(coins => this.handleCoins(coins['data']))
		})
	}

	onAdd() {
		this.dialog.open(AddComponent, {width: '340px'})
	}

	onLogin() {
		this.dialog.open(LoginComponent, {width: '340px'})
	}

	setPriceColor(percent) {
		return percent >= 0 ? 'up' : 'down'
	}

	private handleCoins(coins) {
		this.trackedCoins.forEach(t => {
			Object.keys(coins).forEach(coin => {
				if (coins[coin]['symbol'] === t) {
					this.coins.push(coins[coin])
				}
			})
		})
		console.log(this.coins)
	}


}
