import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

import { Observable, Subject } from 'rxjs';

@Injectable()
export class AfDatabaseService {

  constructor(private db: AngularFireDatabase) { }

  getTrackedCoins() {
  	return this.db.object('trackedCoins').valueChanges();
  }

  getSample() {
  	return this.db.object('sample').valueChanges();
  }

}
