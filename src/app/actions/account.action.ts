import { Action } from '@ngrx/store'

// Section 2
export const LOAD_SETTINGS = '[ACCOUNT] LOAD SETTINGS'

// Section 3
export class LoadSettings implements Action {
	readonly type = LOAD_SETTINGS

	constructor(public payload: Account) {
	}
}

// Section 4
export type Actions = LoadSettings