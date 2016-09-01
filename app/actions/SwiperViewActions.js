import alt from '../alt';

class SwiperViewActions {
	constructor() {
		this.generateActions(
			'getImgListSuccess',
			'getImgListFail'
		);
	}

	getImgList() {
		var mockData = [
			'img/test.png',
			'img/test.png',
			'img/test.png'
		];

		this.actions.getImgListSuccess(mockData);
	}
}

export default alt.createActions(SwiperViewActions);