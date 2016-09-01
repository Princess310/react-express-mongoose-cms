import alt from '../alt';
import NewsListActions from '../actions/NewsListActions';

class NewsListStore {
	constructor() {
		this.bindActions(NewsListActions);
		this.newsList = [];
		this.currentPage = 1;
		this.pageSize = 10;
		this.total = 0;
		this.pageCount = 0;
		this.type = "news";
		this.subType = "default";
	}

	onGetListSuccess(data){
		this.newsList = data.list;
		this.total = data.page.total;
		this.pageCount = data.page.pageCount;
	}

	onGetListFail(message){
		toastr.error(message);
	}

	onChangeSubType(type){
		this.subType = type;
	}
}

export default alt.createStore(NewsListStore);