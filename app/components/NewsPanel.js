import React from 'react';
import {Link} from 'react-router';
import NewsPanelStore from '../stores/NewsPanelStore';
import NewsPanelActions from '../actions/NewsPanelActions';

class NewsPanel extends React.Component {
	constructor(props) {
		super(props);
		this.state = NewsPanelStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		let { id, action } = this.props;

		NewsPanelStore.listen(this.onChange);
		NewsPanelActions.getNavTypes();
		$('#summernote').summernote({
			height: 400,
			placeholder: '请输入内容',
		});

		NewsPanelActions.updateNewsId(id);
		NewsPanelActions.updateAction(action);

		if(action === "update"){
			NewsPanelActions.getNews(id);
		}
	}

	componentDidUpdate() {
		$('#summernote').summernote('code', this.state.content);
		$('.magnific-popup').magnificPopup({
			type: 'image',
			mainClass: 'mfp-zoom-in',
			closeOnContentClick: true,
			midClick: true,
			zoom: {
				enabled: true,
				duration: 300
			}
		});
	}

	componentWillUnmount() {
		NewsPanelStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);
	}

	handleClick(event){
		let dom = event.currentTarget;
		let name = dom.getAttribute("data-name");
		let navId = dom.getAttribute("data-navid");

		NewsPanelActions.changeTypeName(name);
		NewsPanelActions.getSubNavTypes(navId);
	}

	handleSubClick(event){
		let dom = event.currentTarget;
		let id = dom.getAttribute("data-id");
		let navId = dom.getAttribute("data-navid");
		let typeName = dom.getAttribute("data-name");

		let typeInfo = {
			_id: id,
			name: typeName,
			type: navId
		};

		NewsPanelActions.changeType(typeInfo);
	}

	handleSubmit(event){
		event.preventDefault();

		let action = this.state.action;
		let newsId = this.state.newsId;
		let type = this.state.currentType.type;
		let title = this.state.title;
		let brief = this.state.brief;
		let author = this.state.author;
		let pic = this.state.pic;
		let content = $('#summernote').summernote('code');

		NewsPanelActions.checkNews(type, title, brief, author, pic, content);

		if(type && title && brief && author && pic && content){
			NewsPanelActions.saveNews(newsId, type, title, brief, author, pic, content, action);
		}
	}

	render() { 
		let navTypes = this.state.navTypes.map((navType, index) => {
			return (
				<li key={navType._id} data-id={navType._id} data-navid={navType.navTypeId} data-type={navType.type} data-name={navType.name} onClick={this.handleClick.bind(this)}><a href="#">{navType.name}</a></li>
			)
		});

		let subNavTypes = this.state.subNavTypes.map((navType, index) => {
			return (
				<li key={navType._id} data-id={navType._id} data-navid={navType.navTypeId} data-type={navType.type} data-name={navType.name} onClick={this.handleSubClick.bind(this)}><a href="#">{navType.name}</a></li>
			)
		});

		return (
			<div className="NewsPanel" style={{padding: "0 20px"}}>
				<header className="menus">
					<div className="btn-group">
						<button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						{this.state.typeName} <span className="caret"></span>
						</button>
						<ul className="dropdown-menu">
							{navTypes}
						</ul>
					</div>

					<div className={"btn-group " + (this.state.currentType.type == "all" ? "hide" : "")} style={{marginLeft: "16px"}}>
						<button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						{this.state.currentType.name} <span className="caret"></span>
						</button>
						<ul className="dropdown-menu">
							{subNavTypes}
						</ul>
					</div>
				</header>
				<form onSubmit={this.handleSubmit.bind(this)} style={{marginTop: "20px"}}>
					<div className="form-group">
						<label>Title</label>
						<input type="text" className="form-control" id="title" placeholder="title" name="title" value={this.state.title} onChange={NewsPanelActions.updateTitle} />
					</div>
					<div className="form-group">
						<label>Breif</label>
						<input type="text" className="form-control" id="Brief" placeholder="Brief" name="Brief" value={this.state.brief} onChange={NewsPanelActions.updateBrief} />
					</div>
					<div className="form-group">
						<label>Author</label>
						<input type="text" className="form-control" id="author" placeholder="author" name="author" value={this.state.author} onChange={NewsPanelActions.updateAuthor} />
					</div>
					<div className="form-group">
						<label>thumbnail</label>
						<input type="file" id="thumbnail" multiple={false} accept="image/jpg,image/jpeg,image/png,image/gif" onChange={NewsPanelActions.updatePic} />
						<a className='magnific-popup' href={this.state.pic}>
							<img src={this.state.pic} style={{height: "100px", width: "100px", border: "1px #ccc dashed", marginTop: "8px"}} />
						</a>
					</div>
					<div id="summernote" dangerouslySetInnerHTML={{__html: this.state.content}}></div>
					<button type="submit" className="btn btn-primary">Submit</button>
				</form>
			</div>
			
		);
	}
}

export default NewsPanel;