import alt from '../alt';
import BriefActions from '../actions/BriefActions';

class BriefStore {
	constructor() {
		this.bindActions(BriefActions);
		this.brief = {
			title: "",
			content: ""
		};
	}

	onGetBriefSuccess(data) {
		this.brief = data;
	}

	onGetBriefFail() {
		toastr.error('something wrong!');
	}
}

export default alt.createStore(BriefStore);