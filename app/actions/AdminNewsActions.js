import alt from '../alt';

class AdminNewsActions {
	constructor() {
		this.generateActions(
			"getListSuccess",
			"getListFail",
			"changePage",
			"getNavTypesSuccess",
			"getNavTypesFail",
			"getSubNavTypesSuccess",
			"getSubNavTypesFail",
			"changeType",
			"changeSubType",
			"changeUpdateType",
			"updateTypeName",
			"invalidTypeName",
			"saveTypeInfoSuccess",
			"saveTypeInfoFail",
			"deleteNewsSuccess",
			"deleteNewsFail"
		);
	}

	getNewsList(type, currentPage, pageSize) {
		$.ajax({
			url: '/api/news',
			data: { type: type, currentPage: currentPage, pageSize: pageSize }
		}).done((data) => {
			this.actions.getListSuccess(data);
		}).fail((jqXhr) => {
			this.actions.getListFail(jqXhr.responseJSON.message);
		});
	}

	getNavTypes() {
		$.ajax({
			url: '/api/navType'
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

	saveTypeInfo(id, name) {
		$.ajax({
			type: 'POST',
			url: '/api/saveTypeInfo',
			data: { id: id, name: name }
		}).done((data) => {
			this.actions.saveTypeInfoSuccess(data.message);
		}).fail((jqXhr) => {
			this.actions.saveTypeInfoFail(jqXhr.responseJSON.message);
		});
	}

	deleteNews(id) {
		$.ajax({
			type: 'POST',
			url: '/api/deletNews',
			data: { id: id }
		}).done((data) => {
			this.actions.deleteNewsSuccess(data.message);
		}).fail((jqXhr) => {
			this.actions.deleteNewsFail(jqXhr.responseJSON.message);
		});
	}
}

export default alt.createActions(AdminNewsActions);