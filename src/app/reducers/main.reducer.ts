import { Tutorial } from '../models/tutorial.model'
import * as TutorialActions from '../actions/main.action'

// Section 1
const initialState: Tutorial = {
	name: 'Initial Tutorial',
	url: 'http://google.com'
}

export function tutorialReducer(state: Tutorial[] = [ initialState ], action: TutorialActions.Actions) {
	switch (action.type) {
		case TutorialActions.ADD_TUTORIAL:
			return [ ...state, action.payload ]
		case TutorialActions.REMOVE_TUTORIAL:
			return [ ...state.filter((v, i) => i !== action.payload) ]
		case TutorialActions.ADD_SUCCESS:
			console.log('YAS')
			return state
		default:
			return state
	}
}