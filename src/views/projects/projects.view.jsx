import React from 'react';
import { connect } from 'react-redux';
import * as loginActions from 'actions/login/login.action';
import { Link } from 'react-router';


const mapStateToProps = (state) => ({
	login: state.login,
	routing: state.routing
});

export class ProjectsView extends React.Component {
	static propTypes = {
		login: React.PropTypes.object
	}

	handleSubmit = (event) => {
		event.preventDefault();
		this.props.doLogin(this.refs.username.value, this.refs.password.value);
	}

	render () {
		const {isWaiting, authenticated} = this.props.login;
		return (
			<div>
				Projects
			</div>
		);
	}
};
export default connect(mapStateToProps, loginActions)(ProjectsView);