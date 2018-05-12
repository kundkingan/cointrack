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

	messaging
	token

	constructor(private http: HttpClient) { }


	setupMessaging() {
		this.messaging = firebase.messaging();
	}

	setupNotification() {
		this.messaging.requestPermission()
		.then(() => {
			this.messaging.getToken()
			.then((currentToken) => {
				if (currentToken) {
					this.token = currentToken
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

	setupSubscription(topic) {
		let url = 'https://iid.googleapis.com/iid/v1/' +
			this.token  +
			'/rel/topics/' +
			topic

		this.http.post(url, '', httpOptions).subscribe(res => console.log(res))
	}

}
