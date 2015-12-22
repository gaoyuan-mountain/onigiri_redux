import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import DevTools from '../containers/DevToolsWindow.jsx';
import fetch from 'isomorphic-fetch';

export function createConstants (...constants) {
	return constants.reduce((acc, constant) => {
		acc[constant] = constant;
		return acc;
	}, {});
};

export function createReducer (initialState, fnMap) {
	return (state = initialState, { type, payload }, ...rest) => {
		const handler = fnMap[type];
		return handler ? handler(state, payload, ...rest) : state;
	};
};

export function cerateDevToolsWindow (store) {
	const win = window.open(
		null,
		'redux-devtools',
		`width=400,height=${window.outerHeight},menubar=no,location=no,resizable=yes,scrollbars=no,status=no`
	);
	win.location.reload();
	setTimeout(() => {
		win.document.write('<div id="react-devtools-root"></div>');
		win.document.body.style.margin = '0';

		ReactDOM.render(
			<Provider store={store}>
				<DevTools />
			</Provider>
			, win.document.getElementById('react-devtools-root')
		);
	}, 10);
};

export function request (method, data, api) {
	return fetch(api, {
		method,
		headers: {
			'Accept': 'application/json',
			'Content-type': 'application/json'
		},
		body: JSON.stringify(data),
        credentials: 'include'
	});
};