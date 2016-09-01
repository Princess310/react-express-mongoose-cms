import alt from '../alt';
import AboutActions from '../actions/AboutActions';

class AboutStore {
	constructor() {
		this.bindActions(AboutActions);
	}
}

export default alt.createStore(AboutStore);