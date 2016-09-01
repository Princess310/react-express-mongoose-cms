import alt from '../alt';
import LoginActions from '../actions/LoginActions';
import { browserHistory } from 'react-router';

class LoginStore {
	constructor() {
		this.bindActions(LoginActions);
		this.username = "";
		this.password = "";
		this.helpBlock = '';
		this.helpBlock2 = '';
		this.usernameValidationState = "";
		this.passwordValidationState = "";
	}

	onUpdateUsername(event) {
		this.username = event.target.value;
		this.usernameValidationState = '';
		this.helpBlock = '';
	}

	onUpdatePassword(event) {
		this.password = event.target.value;
		this.usernameValidationState = '';
		this.helpBlock2 = '';
	}

	onInvalidUsername() {
		this.usernameValidationState = 'has-error';
		this.helpBlock = 'Please enter a valid username.';
	}

	onInvalidPassword() {
		this.passwordValidationState = 'has-error';
		this.helpBlock2 = 'Please enter a valid password.';
	}

	onLoginSuccess(successMessage) {
    	toastr.success(successMessage);
    	browserHistory.push('/admin');
	}

	onLoginFail(errorMessage) {
		toastr.error(errorMessage);
	}
}

export default alt.createStore(LoginStore);