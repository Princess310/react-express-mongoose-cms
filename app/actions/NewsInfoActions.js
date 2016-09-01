import alt from '../alt';

class NewsInfoActions {
	constructor() {
		this.generateActions(
			"getNewsSuccess",
			"getNewsFail"
		);
	}

	getNewsInfo(id) {
		$.ajax({
			url: '/api/getNewsInfo',
			data: {id: id}
		}).done((data) => {
			this.actions.getNewsSuccess(data);
		}).fail((jqXhr) => {
			this.actions.getNewsFail(jqXhr.responseJSON.message);
		});
	}
}

export default alt.createActions(NewsInfoActions);