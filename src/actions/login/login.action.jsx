import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILED } from '../../constants/login.jsx';
import 'es6-promise';
import { request } from '../../utils/index.jsx'; 

const loginStart = () => ({ type: LOGIN_START });

const loginSuccess = (user) => ({
    type: LOGIN_SUCCESS,
    payload: user,
    meta: {
        transition: (state, action) => ({
            path: `/projects`,
            query: {},
            state: {},
            replace: true
        })
    }    
});

const loginFailed = () => ({ type: LOGIN_FAILED });

export function doLogin (username, password) {
	return dispatch => {
		dispatch(loginStart());
		return request('post', {
			username,
			password
		}, '/user/login')
		.then(response => {
			if (response.status === 200) {
				response.json().then((res) => {
					dispatch(loginSuccess());
				});
			} else {
				dispatch(loginFailed());
			}
		});
	}
};