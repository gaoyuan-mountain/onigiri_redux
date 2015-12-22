import { REGISTER_START, REGISTER_SUCCESS, REGISTER_FAILED } from '../../constants/register.jsx';
import 'es6-promise';
import { request } from '../../utils/index.jsx';

const registerStart = () => ({ type: REGISTER_START });

const registerSuccess = (user) => ({ type: REGISTER_SUCCESS, payload: user });

const registerFailed = () => ({ type: REGISTER_FAILED });

export function doRegister (user) {
	return dispatch => {
		dispatch(registerStart());
		return request('post', user, '/user/register')
			.then(response => {
				if (response.status === 200) {
					dispatch(registerSuccess(response.data));
				} else {
					dispatch(registerFailed());
				}
			});
	};
};