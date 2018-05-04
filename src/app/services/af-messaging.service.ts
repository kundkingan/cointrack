import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import * as firebase from 'firebase';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'key=AAAAoF8fNy4:APA91bFQnmivEDtfwqIfERO33sOeo_028neLxBDiFK7xIxiM8ZMt8dxtAP0QCaFel2tG3fVMJ1AoLgS0B6I7FBLN3HVsXZxZyCPt1LSOCNbSX1w8BrtwfAr4hgldQ15Mm_soBXVpaolt'
  })
};

@Injectable()
export class AfMessagingService {

	messaging: any
	token

	constructor(private http: HttpClient) { }

	setupSubscription(token) {
		this.http.post(
			' https://iid.googleapis.com/iid/v1/' + token  + '/rel/topics/daily-updates', '', httpOptions).subscribe(data => {
				console.log(data)
			})

	}

	setupMessaging() {
		this.messaging = firebase.messaging();

		this.messaging.onTokenRefresh(function () {
			this.messaging.getToken()
				.then(function (refreshedToken) {
					console.log('Token refreshed.');
				})
				.catch(function (err) {
					console.log('Unable to retrieve refreshed token ', err);
				});
		});
	}

	setupNotification() {
		const self = this
		this.messaging.requestPermission()
		.then(() => {
			console.log('Notification permission granted.');
			self.messaging.getToken()
			.then((currentToken) => {
				if (currentToken) {
					console.log(currentToken)
					self.token = currentToken
					this.setupSubscription(currentToken)
				} else {
					console.log('No Instance ID token available. Request permission to generate one.');
				}
			})
			.catch((err) => {
				console.log('An error occurred while retrieving token.', err);
			});
		})
		.catch((err) => {
			console.log('Unable to get permission to notify. ', err);
		})

		this.messaging.onMessage((payload) => {
			console.log("Message received. ", payload);
		});
	}

}