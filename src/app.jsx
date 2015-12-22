import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { syncReduxAndRouter } from 'redux-simple-router';
import Root from './containers/Root.jsx';
import configureStore from './store/configure.store.jsx';

const target  = document.getElementById('root');
const history = createBrowserHistory();
const store = configureStore(window.__INITIAL_STATE__, __DEBUG__, history);

syncReduxAndRouter(history, store);

const node = (
	<Root 
		history={history}
		store={store}
		debug={__DEBUG__}
		debugExternal={__DEBUG_NW__}
	/>
);

ReactDOM.render(node, target);