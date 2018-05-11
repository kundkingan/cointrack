import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class AfDatabaseService {

  constructor(private db: AngularFireDatabase) { }

  getTrackedCoins() {
  	return this.db.object('trackedCoins').valueChanges();
  }

  getSample() {
  	return this.db.object('sample').valueChanges();
  }

  getUser(uid) {
  	return this.db.object(`user/${uid}`).valueChanges();
  }

  getAvailableCoins() {
    return this.db.object('availableCoins').valueChanges();
  }

  setUserCoins(coins, uid) {
    this.db.object(`user/${uid}/coins`).set(coins)
  }

}
