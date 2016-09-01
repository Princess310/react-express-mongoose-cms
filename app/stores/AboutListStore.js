import alt from '../alt';
import AboutListActions from '../actions/AboutListActions';

class AboutListStore {
	constructor() {
		this.bindActions(AboutListActions);
	}
}

export default alt.createStore(AboutListStore);