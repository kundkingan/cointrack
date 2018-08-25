import { Tutorial } from '../models/tutorial.model'
import * as actions from '../actions/main.action'

// Section 1
const initialState: Tutorial = {
	name: 'Initial Tutorial',
	url: 'http://google.com'
}

export function reducer(state: Tutorial[] = [ initialState ], action: actions.Actions) {
	switch (action.type) {
		case actions.ADD_TUTORIAL:
			return [ ...state, action.payload ]
		case actions.REMOVE_TUTORIAL:
			return [ ...state.filter((v, i) => i !== action.payload) ]
		case actions.ADD_SUCCESS:
			return state
		default:
			return state
	}
}