import alt from '../alt';

class BriefActions {
	constructor() {
		this.generateActions(
			'getBriefSuccess',
			'getBriefFail'
		);
	}

	getBrief() {
		var mockData = {
			title: "公司简介",
			content: "四川阿里健集团成立于2016年，坐落在成都武侯区阿里巴巴跨境电商基地，成都武侯区金花女鞋之都，旗下拥有成都百岁堂公司里健集团成司.成都武侯区金花女鞋之都，旗下拥有成都百岁堂公司里健集团成司。"
		};

		this.actions.getBriefSuccess(mockData);
	}
}

export default alt.createActions(BriefActions);