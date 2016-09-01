import alt from '../alt';
import CardListActions from '../actions/CardListActions';

class CardListStore {
	constructor() {
		this.bindActions(CardListActions);
		this.list = [];
	}

	onGetCardListSuccess(data) {
		this.list = data;
	}

	onGetCardListFail() {
		toastr.error('something wrong!');
	}
}

export default alt.createStore(CardListStore);