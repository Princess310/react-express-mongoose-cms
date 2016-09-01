import alt from '../alt';
import AdminHomeActions from '../actions/AdminHomeActions';

class AdminHomeStore {
	constructor() {
		this.bindActions(AdminHomeActions);
	}
}

export default alt.createStore(AdminHomeStore);