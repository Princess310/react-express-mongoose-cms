import alt from '../alt';

class TopicsActions {
	constructor() {
		this.generateActions(
			'getTopicsSuccess',
			'getTopicsFail'
		);
	}

	getTopics() {
		var mockData = {
			title: "新闻/TOPICS",
			list: [
				{id: 0, date: '2016/6/15', title: '邀约APP解决商务邀约难题，轻松商务合作！'},
				{id: 1, date: '2016/6/15', title: '邀约APP解决商务邀约难题，轻松商务合作！'},
				{id: 2, date: '2016/6/15', title: '邀约APP解决商务邀约难题，轻松商务合作！'},
				{id: 3, date: '2016/6/15', title: '邀约APP解决商务邀约难题，轻松商务合作！'},
				{id: 4, date: '2016/6/15', title: '邀约APP解决商务邀约难题，轻松商务合作！'}
			]
		};

		this.actions.getTopicsSuccess(mockData);
	}
}

export default alt.createActions(TopicsActions);