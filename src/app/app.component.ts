import { Component } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { AddComponent } from './add/add.component';
import { LoginComponent } from './login/login.component';
import { ApiService } from './services/api.service';
import { AfDatabaseService } from './services/af-database.service';
import { AfMessagingService } from './services/af-messaging.service';
import { AfAuthService } from './services/af-auth.service';
import { ComponentService } from './services/component.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {

	uid
	availableCoins
	user

	constructor(
		private componentService: ComponentService,
		private apiService: ApiService,
		private dbService: AfDatabaseService,
		private msgService: AfMessagingService,
		private authService: AfAuthService,
		public dialog: MatDialog)
	{
		// this.msgService.setupMessaging();
		// this.msgService.setupNotification()
		this.authService.getAuthState$.subscribe(res => this.handleAuthState(res))
		this.dbService.getAvailableCoins().subscribe(res => {
			this.availableCoins = res
			this.componentService.sendAvailableCoins(res)
		})

	}

	onAdd() {
		let dialogRef = this.dialog.open(AddComponent, {
			width: '340px',
			data: {
				userCoins: this.user.coins,
				availableCoins: this.availableCoins
			}
		})

		dialogRef.afterClosed().subscribe(res => {
			let obj = {}
			for(let i = 0; i < res.length; i++) {
				obj[i] = res[i].name
			}
			this.dbService.setUserCoins(obj, this.uid)
		})
	}

	onLogin() {
		let dialogRef = this.dialog.open(LoginComponent, {width: '340px'})
		dialogRef.afterClosed().subscribe(res => {
			console.log(res)
		})
	}


	handleAuthState(user) {
		if (user !== null) {
			this.uid = user.uid
			this.dbService.getUser(user.uid).subscribe(res => {
				this.user = res
				this.componentService.sendUser(res)
			})
		} else {
			this.dbService.getSample().subscribe(res => {
				this.user = res
				this.componentService.sendUser(res)
			})
		}
	}

}
