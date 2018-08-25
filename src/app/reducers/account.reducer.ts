import * as account from '../actions/account.action'

export interface State {
	isLoaded: boolean;
	settings?: any;
}

export const initialState: State = {
	isLoaded: false
}

export function reducer(state: State = initialState, action: account.Actions) {
	switch (action.type) {
		case account.LOAD_SETTINGS:
			return {
				isLoaded: true,
				settings: '123'
			}

		default:
			return state
	}
}

export const getAccountSettings = (state: State) => state.settings