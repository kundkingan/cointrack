import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

	messaging:any
	token;

  constructor(private db: AngularFireDatabase) {
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

	ngOnInit() {
		const self = this
		this.messaging.requestPermission()
		  .then(function () {
		    console.log('Notification permission granted.');
		    self.messaging.getToken()
		      .then(function (currentToken) {
		        if (currentToken) {
		          self.token = currentToken
		          } else {
		          console.log('No Instance ID token available. Request permission to generate one.');
		        }
		      })
		      .catch(function (err) {
		        console.log('An error occurred while retrieving token.', err);
		      });
		  })
		  .catch(function (err) {
		    console.log('Unable to get permission to notify. ', err);
		})

	  this.messaging.onMessage(function (payload) {
      console.log("Message received. ", payload);
    });
	}

}
