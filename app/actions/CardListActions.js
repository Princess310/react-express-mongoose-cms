import alt from '../alt';

class CardListActions {
	constructor() {
		this.generateActions(
			'getCardListSuccess',
			'getCardListFail'
		);
	}

	getCardList() {
		var mockData = [
			{id: 0, img: 'img/card1.png', brief: '2.0邀约APP版本更新，炎炎夏日，带给您清爽体验。邀约流程优化减少操作步骤，使用更顺畅，邀约更高效。小秘书中增加商业服务。 '},
			{id: 1, img: 'img/card2.png', brief: '阿里健集团网络科技有限公司董事长兼行政官张靖豪先生，于2016年8月3日考察了该项目，并明确表示对于该项目的大力支持和关注,集团网络科技有限公司董事长兼行政官张靖豪先生，于2016年。'}
		];

		this.actions.getCardListSuccess(mockData);
	}
}

export default alt.createActions(CardListActions);