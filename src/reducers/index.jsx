import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import login from './login/login.reducer.jsx';
import register from './register/register.reducer.jsx';

export default combineReducers({
	login,
	register,
	routing: routeReducer
});