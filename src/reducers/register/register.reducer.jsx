import { createReducer } from '../../utils/index.jsx';
import { REGISTER_START, REGISTER_SUCCESS, REGISTER_FAILED } from '../../constants/register.jsx';

const initialState = {
	isWaiting: false	
};

export default createReducer(initialState, {
	[REGISTER_START]: (state) => {
		return Object.assign({}, state, {
			isWaiting: true
		});
	},
	[REGISTER_SUCCESS]: (state, payload) => {
		return Object.assign({}, state, {
			isWaiting: false,
			user: payload
		});
	},
	[REGISTER_FAILED]: (state, payload) => {
		return Object.assign({}, state, {
			isWaiting: false,
			user: {}
		});
	}
});