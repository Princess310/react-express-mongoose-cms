import alt from '../alt';

class LoginActions {
	constructor() {
		this.generateActions(
			'updateUsername',
			'updatePassword',
			'invalidUsername',
			'invalidPassword',
			'loginSuccess',
			'loginFail'
		);
	}

	doLogin(username, password){
		$.ajax({
			type: 'POST',
			url: '/api/login',
			data: { username: username, password: password }
		}).done((data) => {
			this.actions.loginSuccess(data.message);
		}).fail((jqXhr) => {
			this.actions.loginFail(jqXhr.responseJSON.message);
		});
	}
}

export default alt.createActions(LoginActions);