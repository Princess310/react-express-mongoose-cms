import alt from '../alt';
import AdminNewsActions from '../actions/AdminNewsActions';

class AdminNewsStore {
	constructor() {
		this.bindActions(AdminNewsActions);
		this.newsList = [];
		this.currentPage = 1;
		this.pageSize = 10;
		this.total = 0;
		this.pageCount = 0;
		this.navTypes = [];
		this.subNavTypes = [];
		this.currentType = {
			_id: "",
			name: "所有",
			type: "0"
		};
		this.currentSubType = {
			_id: "",
			name: "所有",
			type: "0"
		};
		this.updateType = {
			_id: "",
			name: "",
			type: ""
		};
	}

	onGetListSuccess(data) {
		this.newsList = data.list;
		this.total = data.page.total;
		this.pageCount = data.page.pageCount;
	}

	onGetListFail(message) {
		toastr.error(message);
	}

	onGetNavTypesSuccess(data) {
		this.navTypes = data.list;
	}

	onGetNavTypesFail(message) {
		toastr.error(message);
	}

	onGetSubNavTypesSuccess(data){
		this.subNavTypes = data.list;
	}

	onGetSubNavTypesFail(message) {
		toastr.error(message);
	}

	onChangePage(page) {
		this.currentPage += page;
	}

	onChangeType(typeInfo) {
		this.currentType = typeInfo;
	}

	onChangeSubType(typeInfo){
		this.currentSubType = typeInfo;
	}

	onChangeUpdateType(typeInfo){
		this.updateType = typeInfo;
	}

	onUpdateTypeName(event) {
		let name = event.target.value;
		this.updateType.name = name;

		if(this.currentSubType.type === "0"){
			this.currentType.name = name;
		}else {
			this.currentSubType.name = name;
		}
	}

	onInvalidTypeName(){
		toastr.error("类型名字不能为空!");
	}

	onSaveTypeInfoSuccess(successMessage){
		toastr.success(successMessage);
	}

	onSaveTypeInfoFail(errorMessage){
		toastr.error(errorMessage);
	}

	onDeleteNewsSuccess(successMessage){
		toastr.success(successMessage);
		AdminNewsActions.getNewsList(this.currentType.type, this.currentPage, this.pageSize);
	}

	onDeleteNewsFail(errorMessage){
		toastr.error(errorMessage);
	}
}

export default alt.createStore(AdminNewsStore);