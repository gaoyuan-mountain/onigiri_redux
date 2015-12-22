import React from 'react';
import { connect } from 'react-redux';
import * as registerActions from 'actions/register/register.action.jsx';
import { Link } from 'react-router';
import styles from './register.scss';

const mapStateToProps = (state) => ({
	register: state.register
});

export class RegisterView extends React.Component {
	static propTypes = {
		register: React.PropTypes.object
	}

	handleSubmit = (event) => {
		event.preventDefault();
		this.props.doRegister({
			username: this.refs.username.value,
			password: this.refs.password.value,
			email: this.refs.email.value
		});
	}

	render () {
		return (
			<div className={styles["register-constraint"]} >
				<div className={styles["banner"]}></div>
				<div className={styles["main"]}>
					<form onSubmit={this.handleSubmit.bind(this)}>
						<div className={styles["form-group"]}>
							<input required className={styles["form-control"]} type="text" placeholder="Username" ref="username" />
						</div>
						<div className={styles["form-group"]}>
							<input required className={styles["form-control"]} type="password" placeholder="Password" ref="password" />
						</div>
						<div className={styles["form-group"]}>
							<input required className={styles["form-control"]} type="text" placeholder="Email" ref="email" />
						</div>
						<div className={styles["form-group"]}>
							<input type="submit" className={styles["btn-line-green"]} value="Sign Up" />
						</div>
					</form>
				</div>
			</div>
		);
	}
};
export default connect(mapStateToProps, registerActions)(RegisterView);