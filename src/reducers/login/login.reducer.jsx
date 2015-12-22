import { createReducer } from '../../utils/index.jsx';
import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILED } from '../../constants/login.jsx';

const initialState = {
	isWaiting: false,
	authenticated: false
};

export default createReducer(initialState, {
	[LOGIN_START]: (state) => {
		return Object.assign({}, state, {
			isWaiting: true
		});
	},
	[LOGIN_SUCCESS]: (state, payload) => {
		return Object.assign({}, state, {
			isWaiting: false,
			authenticated: true
		});
	},
	[LOGIN_FAILED]: (state, payload) => {
		return Object.assign({}, state, {
			isWaiting: false,
			authenticated: false
		});
	}
});