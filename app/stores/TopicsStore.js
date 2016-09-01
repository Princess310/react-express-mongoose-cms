import alt from '../alt';
import TopicsActions from '../actions/TopicsActions';

class TopicsStore {
	constructor() {
		this.bindActions(TopicsActions);
		this.topics = {
			title: "",
			list: []
		};
	}

	onGetTopicsSuccess(data) {
		this.topics = data;
	}

	onGetTopicsFail() {
		toastr.error('something wrong!');
	}
}

export default alt.createStore(TopicsStore);