import alt from '../alt';

class NewsPanelActions {
	constructor() {
		this.generateActions(
			"getNavTypesSuccess",
			"getNavTypesFail",
			"getSubNavTypesSuccess",
			"getSubNavTypesFail",
			"changeType",
			"changeTypeName",
			"updateTitle",
			"updateBrief",
			"updateAuthor",
			"updatePic",
			"updateNewsId",
			"updateAction",
			"saveNewsSuccess",
			"saveNewsFail",
			"updateNeasSuccess",
			"updateNeasFail",
			"getNewsSuccess",
			"getNewsFail",
			"checkNews"
		);
	}

	getNavTypes() {
		$.ajax({
			url: '/api/navType',
			data: {onlyTypes: true}
		}).done((data) => {
			this.actions.getNavTypesSuccess(data);
		}).fail((jqXhr) => {
			this.actions.getNavTypesFail(jqXhr.responseJSON.message);
		});
	}

	getSubNavTypes(pid) {
		$.ajax({
			url: '/api/getSubType',
			data: {pid: pid} 
		}).done((data) => {
			this.actions.getSubNavTypesSuccess(data);
		}).fail((jqXhr) => {
			this.actions.getSubNavTypesFail(jqXhr.responseJSON.message);
		});
	}

	saveNews(newsId, type, title, brief, author, pic, content, action) {
		let url = '/api/saveNews';

		if(action === "update"){
			url = '/api/updateNews';
		}

		$.ajax({
			type: 'POST',
			url: url,
			data: {
				newsId: newsId,
				parrentNav: type,
				title: title,
				brief: brief,
				author: author,
				pic: pic,
				content: content
			}
		}).done((data) => {
			this.actions.saveNewsSuccess(data.message);
		}).fail((jqXhr) => {
			this.actions.saveNewsFail(jqXhr.responseJSON.message);
		});
	}

	getNews(id) {
		$.ajax({
			url: '/api/getNews',
			data: {id: id}
		}).done((data) => {
			this.actions.getNewsSuccess(data);
		}).fail((jqXhr) => {
			this.actions.getNewsFail(jqXhr.responseJSON.message);
		});
	}
}

export default alt.createActions(NewsPanelActions);