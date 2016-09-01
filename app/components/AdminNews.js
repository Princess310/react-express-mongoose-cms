import React from 'react';
import {Link} from 'react-router';
import AdminNewsStore from '../stores/AdminNewsStore';
import AdminNewsActions from '../actions/AdminNewsActions';

class AdminNews extends React.Component {
	constructor(props) {
		super(props);
		this.state = AdminNewsStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		AdminNewsStore.listen(this.onChange);
		AdminNewsActions.getNavTypes();
		AdminNewsActions.getNewsList(this.state.currentType.type, this.state.currentPage, this.state.pageSize);
	}

	componentWillUnmount() {
		AdminNewsStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);
	}

	// 分页查询
	handlePage(page) {
		AdminNewsActions.getNewsList(this.state.currentType.type, this.state.currentPage + page, this.state.pageSize);
		AdminNewsActions.changePage(page);
	}

	handleClick(event){
		let dom = event.currentTarget;
		let id = dom.getAttribute("data-id");
		let type = dom.getAttribute("data-type");
		let navId = dom.getAttribute("data-navid");
		let typeName = dom.getAttribute("data-name");

		let typeInfo = {
			_id: id,
			name: typeName,
			type: navId
		};

		AdminNewsActions.changeType(typeInfo);
		AdminNewsActions.changeSubType({
			_id: id,
			name: "所有",
			type: "0"
		});
		AdminNewsActions.changeUpdateType(typeInfo);

		if(type !== "0"){
			AdminNewsActions.getSubNavTypes(navId);
		}
		
		AdminNewsActions.getNewsList(navId, this.state.currentPage, this.state.pageSize);
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

		AdminNewsActions.changeSubType(typeInfo);
		AdminNewsActions.changeUpdateType(typeInfo);

		if(navId === "0"){
			navId = this.state.currentType.type;
		}
		AdminNewsActions.getNewsList(navId, this.state.currentPage, this.state.pageSize);
	}

	handleSubmit(event){
		event.preventDefault();

		let id = this.state.updateType._id;
		let typeName = this.state.updateType.name;

		if(!typeName){
			AdminNewsActions.invalidTypeName();
		}

		AdminNewsActions.saveTypeInfo(id, typeName);
	}

	handleDelete(event){
		let dom = event.currentTarget;
		let id = dom.getAttribute("data-id");

		AdminNewsActions.deleteNews(id);
	}

	render() {
		let newsList = this.state.newsList.map((news, index) => {
			return (
				<tr key={news._id}>
					<td>{index + 1}</td>
					<td><Link to={"/admin/update/" + news.newsId}>{news.title}</Link></td>
					<td>{news.author}</td>
					<td>{news.ctime}</td>
					<td>{news.utime}</td>
					<td><button data-id={news._id} className="btn btn-danger" onClick={this.handleDelete.bind(this)}>Delete</button></td>
				</tr>
			)
		});

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
			<div className="AdminNews">
				<header className="menus">
					<div className="btn-group">
						<button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						{this.state.currentType.name} <span className="caret"></span>
						</button>
						<ul className="dropdown-menu">
							{navTypes}
						</ul>
					</div>

					<div className={"btn-group " + (this.state.currentType.type == "0" ? "hide" : "")} style={{marginLeft: "16px"}}>
						<button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						{this.state.currentSubType.name} <span className="caret"></span>
						</button>
						<ul className="dropdown-menu">
							<li data-id={this.state.currentType._id} data-type="0" data-navid="0" data-name="所有" onClick={this.handleSubClick.bind(this)}><a href="#">所有</a></li>
							{subNavTypes}
						</ul>
					</div>

					<a href="/admin/add" className="btn btn-info pull-right" style={{marginRight: "8px"}}>添加</a>
				</header>
				<div className="content">
					<form className={"form-inline " + (this.state.currentType.type == "0" ? "hide" : "")} onSubmit={this.handleSubmit.bind(this)}>
						<div className='form-group'>
							<label>name</label>
							<input type="text" className="form-control" placeholder="name" value={this.state.updateType.name} onChange={AdminNewsActions.updateTypeName}/>
						</div>
						<div className='form-group' style={{marginLeft: '40px'}}>
							<label>News Style</label>
							<select className="form-control" disabled>
								<option>default</option>
							</select>
						</div>
						<button type="submit" className="btn btn-primary" style={{marginLeft: '40px', float: "right"}}>Submit</button>
					</form>
					<div className="list">
						<table className="table">
					      <caption>新闻列表</caption>
					      <thead>
					        <tr>
					          <th>#</th>
					          <th>标题</th>
					          <th>作者</th>
					          <th>创建时间</th>
					          <th>更新时间</th>
					        </tr>
					      </thead>
					      <tbody>
					        {newsList}
					      </tbody>
					    </table>

					    <footer>
					    	<ul className="pager">
							    <li className={"previous " + (this.state.currentPage == 1 ? "disabled" : "")}  onClick={this.handlePage.bind(this, -1)}>
							    	<a><span aria-hidden="true">&larr;</span> Older</a>
							    </li>
							    <li className={"next " + (this.state.currentPage == this.state.pageCount ? "disabled" : "")}  onClick={this.handlePage.bind(this, 1)}>
							    	<a>Newer <span aria-hidden="true">&rarr;</span></a>
							    </li>
							</ul>
					   	</footer>
					</div>
				</div>
			</div>
		);
	}
}

export default AdminNews;