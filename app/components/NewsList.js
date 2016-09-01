import React from 'react';
import {Link} from 'react-router';
import NavLink from './NavLink';
import NewsListStore from '../stores/NewsListStore';
import NewsListActions from '../actions/NewsListActions';
import moment from 'moment';

class NewsList extends React.Component {
	constructor(props) {
		super(props);
		this.state = NewsListStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		let subType = this.props.part;
		NewsListStore.listen(this.onChange);
		NewsListActions.changeSubType(subType);
		NewsListActions.getList(this.state.currentPage, this.state.type, subType, this.state.pageSize);
	}

	componentWillUnmount() {
		NewsListStore.unlisten(this.onChange);
	}

	componentWillReceiveProps(nextProps) {
		let subType = nextProps.part;
		NewsListActions.getList(this.state.currentPage, this.state.type, subType, this.state.pageSize);
	}

	onChange(state) {
		this.setState(state);
	}

	render() {
		let months = moment.monthsShort();
		let newsList = this.state.newsList.map((news, index) => {
			let date = new Date(news.utime);
			return (
				<div className="item" key={news.newsId}>
					<div className="date">
						<div className="day">{date.getDay()}</div>
						<div className="month">{months[date.getMonth()].toUpperCase()}</div>
						<div className="year">{date.getFullYear()}</div>
					</div>
					<div className="content">
						<NavLink to={"/web/board/" + this.state.type + "/" + this.state.subType + "/" + news.newsId} className="title">{news.title}</NavLink>
						<div className="author">发布者：{news.author}</div>
						<article>
							{news.brief}
						</article>
					</div>
				</div>
			);
		});

		return (
			<div className="NewsList">
				{newsList}
			</div>
		);
	}
}

export default NewsList;
