import alt from '../alt';
import NewsInfoActions from '../actions/NewsInfoActions';

class NewsInfoStore {
	constructor() {
		this.bindActions(NewsInfoActions);
		this.content = "";
	}

	onGetNewsSuccess(data){
		let { news } = data;

		this.content = news.content;
	}

	onGetNewsFail(failMessage){
		toastr.error(failMessage);
	}
}

export default alt.createStore(NewsInfoStore);