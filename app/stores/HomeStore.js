import alt from '../alt';
import HomeActions from '../actions/HomeActions';

class HomeStore {
	constructor() {
		this.bindActions(HomeActions);
		this.onlineUsers = 0;
	}
}

export default alt.createStore(HomeStore);