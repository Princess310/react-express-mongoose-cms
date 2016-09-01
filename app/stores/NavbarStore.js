import alt from '../alt';
import NavbarActions from '../actions/NavbarActions';

class NavbarStore {
	constructor() {
		this.bindActions(NavbarActions);
		this.onlineUsers = 0;
		this.navTypes = [];
	}

	onGetNavTypesSuccess(data) {
		this.navTypes = data.list;
	}

	onGetNavTypesFail(message) {
		toastr.error(message);
	}
}

export default alt.createStore(NavbarStore);