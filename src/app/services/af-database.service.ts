import { Injectable } from '@angular/core'
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database'

import { Observable ,  Subject } from 'rxjs'

@Injectable()
export class AfDatabaseService {

  constructor(private db: AngularFireDatabase) { }

  getTrackedCoins() {
  	return this.db.object('trackedCoins').valueChanges()
  }

  getSample() {
  	return this.db.database.ref('sample').once('value')
  }

  getUser(uid) {
  	return this.db.object(`user/${uid}`).valueChanges()
  }

  getUserCoins(uid) {
    return this.db.object(`user/${uid}/coins`).valueChanges()
  }

  getUserSubscription(uid) {
    return this.db.database.ref(`user/${uid}/subscriptions`).once('value')
  }

  getAvailableCoins() {
    return this.db.object('availableCoins').valueChanges()
  }

  setUserCoins(coins, uid) {
    this.db.object(`user/${uid}/coins`).set(coins)
  }

  updateTopics(newTopic) {
    this.db.database.ref('topics').once('value')
      .then((snap) => {
        let topics = []
        snap.forEach((topic) => {
          topics.push(topic.val())
        })

        if (!topics.find((topic) => topic === newTopic ? true : false)) {
          this.db.object('topics').update({[topics.length] : newTopic})
        }
      })
  }

  updateUserTopic(topic, uid) {
    this.db.object(`user/${uid}/subscriptions`).set(topic)
  }

}
