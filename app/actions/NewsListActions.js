import alt from '../alt';

class NewsListActions {
	constructor() {
		this.generateActions(
			"getListSuccess",
			"getListFail",
			"changeSubType"
		);
	}

	getList(currentPage, type, subType, pageSize) {
		$.ajax({
			url: '/api/newsByTag',
			data: {currentPage: currentPage, type: type, subType: subType, pageSize: pageSize}
		}).done((data) => {
			this.actions.getListSuccess(data);
		}).fail((jqXhr) => {
			this.actions.getListFail(jqXhr.responseJSON.message);
		});
	}
}

export default alt.createActions(NewsListActions);