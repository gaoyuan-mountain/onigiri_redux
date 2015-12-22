import React from 'react';
import { connect } from 'react-redux';
import * as loginActions from 'actions/login/login.action';
import { Link } from 'react-router';
import styles from './login.scss';

const mapStateToProps = (state) => ({
	login: state.login,
	routing: state.routing
});

export class LoginView extends React.Component {
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
			<div className={styles["login-constraint"]} >
				<div className={styles["banner"]}></div>
				<div className={styles["main"]}>
					<form name="loginForm" onSubmit={this.handleSubmit.bind(this)}>
						<div className={styles["form-group"]}>
							<input required className={styles["form-control"]} type="text" placeholder="Username" ref="username" />
						</div>
						<div className={styles["form-group"]}>
							<input required className={styles["form-control"]} type="password" placeholder="Password" ref="password" />
						</div>
						<div className={styles["form-group"]}>
							<input type="submit" className={styles["btn-line-green"]} value="Sign In" />
						</div>
					</form>
				</div>
			</div>
		);
	}
};
export default connect(mapStateToProps, loginActions)(LoginView);