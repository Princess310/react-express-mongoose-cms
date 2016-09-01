import React from 'react';
import LoginStore from '../stores/LoginStore';
import LoginActions from '../actions/LoginActions';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = LoginStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		LoginStore.listen(this.onChange);
	}

	componentWillUnmount() {
		LoginStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);
	}

	handleSubmit(event) {
		event.preventDefault();

		let username = this.state.username;
		let password = this.state.password;

		if (!username) {
			LoginActions.invalidUsername();
			return;
		}

		if (!password) {
			LoginActions.invalidPassword();
			return;
		}

		LoginActions.doLogin(username, password);
	}

	render() {
		return (
			<div className="Login">
				<form onSubmit={this.handleSubmit.bind(this)}>
					<h2>Please sign in</h2>
					<div className={'form-group ' + this.state.usernameValidationState}>
						<label>Username</label>
						<input type="text" className="form-control" placeholder="Username" value={this.state.username} onChange={LoginActions.updateUsername}/>
						<span className='help-block'>{this.state.helpBlock}</span>
					</div>
					<div className={'form-group ' + this.state.passwordValidationState}>
						<label>Password</label>
						<input type="password" className="form-control" id="password" placeholder="Password" onChange={LoginActions.updatePassword}/>
						<span className='help-block'>{this.state.helpBlock2}</span>
					</div>
					<button type="submit" className="btn btn-lg btn-primary btn-block">Submit</button>
				</form>
			</div>
		);
	}
}

export default Login;