import { Action } from '@ngrx/store'

// Section 2
export const LOAD_NOTIFICATIONS = '[NOTIFICATION] LOAD SETTINGS'

// Section 3
export class LoadNotifications implements Action {
	readonly type = LOAD_NOTIFICATIONS

	constructor(public payload: Account) {
	}
}

// Section 4
export type Actions = LoadNotifications