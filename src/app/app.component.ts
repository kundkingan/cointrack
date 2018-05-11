import { Component } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { AddComponent } from './add/add.component';
import { LoginComponent } from './login/login.component';
import { NotificationComponent } from './notification/notification.component';

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
	signedIn = true
	showContent = false
	loading = true

	constructor(
		private componentService: ComponentService,
		private apiService: ApiService,
		private afDbService: AfDatabaseService,
		private afMsgService: AfMessagingService,
		private afAuthService: AfAuthService,
		public dialog: MatDialog)
	{
		this.afMsgService.setupMessaging();
		this.afMsgService.setupNotification()
		this.afAuthService.getAuthState$.subscribe(res => this.handleAuthState(res))
		this.afDbService.getAvailableCoins().subscribe(res => this.availableCoins = res)
		this.componentService.getLoadingStatus$.subscribe(status => this.loading = status)

	}

	onAdd() {
		this.dialog.open(AddComponent, {
			width: '340px',
			data: {
				userCoins: this.user !== null ? this.user.coins : null,
				availableCoins: this.availableCoins
			}
		}).afterClosed().subscribe(res => {
			let obj = {}

			if (res !== null) {
				for(let i = 0; i < res.length; i++) {
					obj[i] = res[i].name
				}
			} else {
				obj = null
			}

			this.afDbService.setUserCoins(obj, this.uid)
		})
	}

	onLogin() {
		// this.dialog.open(LoginComponent, { width: '340px' })
		// .afterClosed().subscribe(res => console.log(res))
		//
		this.afAuthService.login();
	}

	onNotifications() {
		this.dialog.open(NotificationComponent, { width: '340px' })
		.afterClosed().subscribe(res => console.log(res))
	}

	handleAuthState(user) {
		this.showContent = true
		if (user !== null) {
			this.uid = user.uid
			this.afDbService.getUser(user.uid).subscribe(res => {
				this.user = res
				this.componentService.sendUser(res)
			})
		} else {
			this.afDbService.getSample().subscribe(res => {
				this.signedIn = false
				this.user = res
				this.componentService.sendUser(res)
			})
		}
	}

}
