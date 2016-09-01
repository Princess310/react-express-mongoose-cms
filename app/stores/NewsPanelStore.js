import alt from '../alt';
import NewsPanelActions from '../actions/NewsPanelActions';
import { browserHistory } from 'react-router';

class NewsPanelStore {
	constructor() {
		this.bindActions(NewsPanelActions);
		this.navTypes = [];
		this.subNavTypes = [];
		this.title = "";
		this.brief = "";
		this.author = "";
		this.content = "";
		this.pic = "";
		this.newsId = "";
		this.action = "add";
		this.typeName = "";
		this.doRefreshSubType = true;
		this.currentType = {
			_id: "",
			name: "",
			type: ""
		};
	}

	onGetNavTypesSuccess(data) {
		this.navTypes = data.list;
		
		this.typeName = data.list[0].name;

		if(this.action === "addd"){
			NewsPanelActions.getSubNavTypes(data.list[0].navTypeId);
		}
	}

	onGetNavTypesFail(message) {
		toastr.error(message);
	}

	onGetSubNavTypesSuccess(data){
		this.subNavTypes = data.list;

		if(!this.doRefreshSubType && this.action === "update"){
			this.doRefreshSubType = true;
			return;
		}

		let nav = data.list[0];

		this.currentType = {
			_id: nav._id,
			name: nav.name,
			type: nav.navTypeId
		};
	}

	onGetSubNavTypesFail(message) {
		toastr.error(message);
	}

	onChangeType(typeInfo) {
		this.currentType = typeInfo;
	}

	onChangeTypeName(name) {
		this.typeName = name;
	}

	onUpdateTitle(event) {
		this.title = event.target.value;
	}

	onUpdateBrief(event) {
		this.brief = event.target.value;
	}

	onUpdateAuthor(event) {
		this.author = event.target.value;
	}

	onUpdateNewsId(newsId) {
		this.newsId = newsId;
	}

	onUpdateAction(action) {
		this.action = action;
	}

	onUpdatePic(event){
		let file = event.target.files[0];
		let reader = new FileReader();
		let self = this;

		reader.readAsDataURL(file);
		reader.onload = function(e){
			self.setState({pic: this.result});
			toastr.success("upload successfully!");
		};
	}

	onSaveNewsSuccess(successMessage) {
		toastr.success(successMessage);
		browserHistory.push('/admin/news');
	}

	onSaveNewsFail(failMessage) {
		toastr.error(failMessage);
	}

	onGetNewsSuccess(data){
		let { news, type, parrentType } = data;

		this.setState({
			title: news.title,
			brief: news.brief,
			author: news.author,
			content: news.content,
			pic: news.pic,
			newsId: news.newsId,
			typeName: parrentType.name,
			currentType: {
				_id: type._id,
				name: type.name,
				type: type.navTypeId
			},
			doRefreshSubType: false
		});

		NewsPanelActions.getSubNavTypes(parrentType.navTypeId);
	}

	onGetNewsFail(failMessage){
		toastr.error(failMessage);
	}

	onCheckNews(...props){
		let result = true;
		let checkFields = ["分类", "标题", "简介", "作者", "缩略图", "内容"];

		props[0].map((field, index) => {
			if(!field || field === ""){
				toastr.error(checkFields[index] + "不能为空！");
			}
		});
	}
}

export default alt.createStore(NewsPanelStore);