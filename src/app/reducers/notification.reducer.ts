import * as notification from '../actions/notification.action'

export interface State {
	settings: any;
}

export const initialState: State = {
	settings: {}
}

export function reducer(state: State = initialState, action: notification.Actions) {
	switch (action.type) {
		case notification.LOAD_NOTIFICATIONS:
			return {
				settings: {}
			}

		default:
			return state
	}
}

export const getNotifications = (state: State) => state.settings