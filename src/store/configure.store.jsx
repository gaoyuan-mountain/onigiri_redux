import rootReducer from '../reducers/index.jsx';
import thunk from 'redux-thunk';
import DevTools from '../containers/DevTools.jsx';
import { applyMiddleware, compose, createStore } from 'redux';
import storeEnhancer from 'redux-history-transitions';

export default function configureStore (initialState, debug = false, history) {
	let createStoreWithMiddleware;

	const middleware = applyMiddleware(thunk);

	if (debug) {
		createStoreWithMiddleware = compose(middleware, storeEnhancer(history), DevTools.instrument());
	} else {
		createStoreWithMiddleware = compose(middleware, storeEnhancer(history));
	}

	const store = createStoreWithMiddleware(createStore)(
		rootReducer, initialState
	);

	if (module.hot) {
		module.hot.accept('../reducers', () => {
			const nextRootReducer = require('../reducers/index.jsx');
			store.replaceReducer(nextRootReducer);
		});
	}
	return store;
};