import { Component } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { AddComponent } from './add/add.component';
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
	selectedCoins
	signedIn = true
	showContent = false
	loading = true

	private userCoinsSubscription

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
		this.afDbService.getAvailableCoins().subscribe(res => this.availableCoins = res)
		this.componentService.getLoadingStatus$.subscribe(status => this.loading = status)
		this.afAuthService.getAuthState().subscribe(res => this.handleAuthState(res))
	}

	onAdd() {
		if (this.signedIn && this.user !== undefined) {
			this.dialog.open(AddComponent, {
				width: '340px',
				data: {
					selectedCoins:
						this.selectedCoins !== null ? this.selectedCoins : null,
					availableCoins: this.availableCoins
				}
			}).afterClosed().subscribe(res => {
				let userCoins = {}
				let topic = res.map(res => res.name)
				.sort()
				.join('-')

				if (res.length !== 0) {
					for(let i = 0; i < res.length; i++) {
						userCoins[i] = res[i].name
					}
					this.afDbService.updateTopics(topic)
					this.afDbService.updateUserTopic(topic, this.uid)
					this.afMsgService.setupSubscription(topic)
				} else {
					userCoins = null
					this.afDbService.updateUserTopic(null, this.uid)
					this.afMsgService.setupSubscription('none')
				}
				this.afDbService.setUserCoins(userCoins, this.uid)
			})
		}
	}

	onLogin() {
		this.afAuthService.login();
	}

	onNotifications() {
		this.dialog.open(NotificationComponent, { width: '340px' })
			.afterClosed().subscribe(res => console.log(res))
	}

	private handleAuthState(user) {
		this.showContent = true

		if (user !== null) {
			this.signedIn = true
			this.uid = user.uid
			this.user = user
			this.handleUserCoins()
			this.afDbService.getUserSubscription(this.uid).then(snap =>
				this.afMsgService.setupSubscription(snap.val())
			)
		} else {
			this.signedIn = false
			this.user = null
			this.afDbService.getSample().then((snap) => {
        snap.forEach((res) =>
          this.componentService.sendCoins(res.val()))
      })
		}
	}

	private handleUserCoins() {
		this.userCoinsSubscription = this.afDbService.getUserCoins(this.uid).subscribe(res => {
			this.selectedCoins = res
			this.componentService.sendCoins(res)
		})
	}

}
