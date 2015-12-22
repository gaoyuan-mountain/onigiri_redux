import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import routes from '../routes/index.jsx';
import DevTools from './DevTools.jsx';
import { createDevToolsWindow } from '../utils/index.jsx';

export default class Root extends React.Component {
	static propTypes = {
	    history: React.PropTypes.object.isRequired,
	    store: React.PropTypes.object.isRequired,
	    debug: React.PropTypes.bool,
	    debugExternal: React.PropTypes.bool
	}

	static defaultProps = {
		debug: false,
		debugExternal: false
	}

	renderDevTools () {
		if (!this.props.debug) {
			return null;
		}

		return this.props.debugExternal ? 
			createDevToolsWindow(this.props.store) : 
			<DevTools />;
	}

	render () {
		return (
			<Provider store={this.props.store}>
				<div>
					<Router history={this.props.history}>
						{routes}
					</Router>
					{this.renderDevTools()}
				</div>
			</Provider>
		);
	}
};