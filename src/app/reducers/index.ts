import { Tutorial } from '../models/tutorial.model'

import * as fromAccount from './account.reducer'
import * as fromMain from './main.reducer'
import * as fromNotification from './notification.reducer'
import { ActionReducerMap } from '@ngrx/store'

export interface State {
	main: Tutorial[],
	account: fromAccount.State,
	notification: fromNotification.State
}

export const reducers: ActionReducerMap<State> = {
	account: fromAccount.reducer,
	main: fromMain.reducer,
	notification: fromNotification.reducer
}