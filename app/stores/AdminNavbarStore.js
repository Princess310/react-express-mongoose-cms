import alt from '../alt';
import AdminNavbarActions from '../actions/AdminNavbarActions';

class AdminNavbar {
	constructor() {
		this.bindActions(AdminNavbarActions);
	}
}

export default alt.createStore(AdminNavbar);