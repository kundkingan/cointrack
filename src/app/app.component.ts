import { Component } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { AddComponent } from './add/add.component';
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
			this.apiService.getTopCoins().subscribe(coins => this.handleCoins(coins))
		})
	}

	onAdd() {
		this.dialog.open(AddComponent, {width: '340px'})
	}

	setPriceColor(percent) {
		return percent >= 0 ? 'up' : 'down'
	}

	private handleCoins(coins) {
		this.trackedCoins.forEach(t => {
			coins.forEach(coin => {
				if (t === coin.symbol) {
					this.coins.push(coin)
				}
			})
		})
		console.log(this.coins)
	}


}
