import { Action } from '@ngrx/store'
import { Tutorial } from '../models/tutorial.model'

// Section 2
export const ADD_TUTORIAL = '[TUTORIAL] Add'
export const REMOVE_TUTORIAL = '[TUTORIAL] Remove'
export const ADD_SUCCESS = 'DONE'

// Section 3
export class AddTutorial implements Action {
	readonly type = ADD_TUTORIAL

	constructor(public payload: Tutorial) {
	}
}

export class RemoveTutorial implements Action {
	readonly type = REMOVE_TUTORIAL

	constructor(public payload: number) {
	}
}

export class AddSuccess implements Action {
	readonly type = ADD_SUCCESS

	constructor(public payload: string) {
	}
}

// Section 4
export type Actions = AddTutorial | RemoveTutorial | AddSuccess