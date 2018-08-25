import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Action } from '@ngrx/store'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Observable, of } from 'rxjs'
import { catchError, map, mergeMap } from 'rxjs/operators'
import * as TutorialActions from '../actions/main.action'

@Injectable()
export class TutorialEffect {

	@Effect()
	add$: Observable<Action> = this.actions$.pipe(
		ofType(TutorialActions.ADD_TUTORIAL),
		mergeMap(action =>
			this.http.get('http://www.omdbapi.com/?apikey=f54ce775&t=batman').pipe(
				map(data => ({ type: TutorialActions.ADD_SUCCESS, payload: data })),
				catchError(() => of({ type: TutorialActions.ADD_SUCCESS }))
			)
		)
	)


	constructor(
		private http: HttpClient,
		private actions$: Actions) {
	}
}