import alt from '../alt';
import DahboardActions from '../actions/DahboardActions';

class DahboardStore {
	constructor() {
		this.bindActions(DahboardActions);
	}
}

export default alt.createStore(DahboardStore);