import React from 'react';
import {Link} from 'react-router';
import NewsInfoStore from '../stores/NewsInfoStore';
import NewsInfoActions from '../actions/NewsInfoActions';

class NewsInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = NewsInfoStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		let { id } = this.props;
		NewsInfoStore.listen(this.onChange);
		NewsInfoActions.getNewsInfo(id);
	}

	componentWillUnmount() {
		NewsInfoStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);
	}

	render() {
		return (
			<div dangerouslySetInnerHTML={{__html: this.state.content}}></div>
		);
	}
}

export default NewsInfo;