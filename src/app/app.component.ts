import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { PushService } from './push.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

	messaging:any
	itemsArr = [];
	items;
	token;
	itemsDisplay;
	hideToken: boolean = false
	pushData: any = {
	'notification': {
	  "title": "Background Message Title",
	  "body": "Background Message Body"
	},
		"to": ""
	}

  constructor(private db: AngularFireDatabase, private pushService: PushService) {
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

		this.itemsArr = []  // Reinitialize the array to prevent data duplication
		this.items = this.db.list('/items').valueChanges();
		this.items.subscribe(snapshots => {
		  snapshots.forEach(snapshot => {
		    console.log(snapshot.val().tokenID);
		    this.itemsArr.push(snapshot.val().tokenID);
		  });
		});
  }

  checkToken(token, arr) {
    let counter: number = 0
    for (var i = 0; i < arr.length; i++) {
    if (arr[i] === token) {
            counter++
        }
    }
    console.log("Counter value", counter)
    return counter
	}

	ngOnInit() {
		const self = this
		this.items = this.db.list('/items').valueChanges()
		this.messaging.requestPermission()
		  .then(function () {
		    console.log('Notification permission granted.');
		    self.messaging.getToken()
		      .then(function (currentToken) {
		        if (currentToken) {
		          self.token = currentToken
		          self.pushData.to = self.token
		          } else {
		          // Show permission request.
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

  generatePush() {
    console.log("Inside push function")
    console.log(this.pushData.to)
    if (this.pushData.to === "") {
      console.log("No token available")
      return
    }
    this.pushService.generatePush(this.pushData)
      .subscribe(data => { console.log("Succesfully Posted") }, err => console.log(err))
  }
}
