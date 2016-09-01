import alt from '../alt';

class NavbarActions {
	constructor() {
		this.generateActions(
			"getNavTypesSuccess",
			"getNavTypesFail"
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
}

export default alt.createActions(NavbarActions);