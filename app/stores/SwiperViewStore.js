import alt from '../alt';
import SwiperViewActions from '../actions/SwiperViewActions';

class SwiperViewStore {
	constructor() {
		this.bindActions(SwiperViewActions);
		this.imgList = [];
	}

	onGetImgListSuccess(data) {
		this.imgList = data;
	}

	onGetImgListFail() {
		toastr.error('something wrong!');
	}
}

export default alt.createStore(SwiperViewStore);