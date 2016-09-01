import React from 'react';
import {Link} from 'react-router';
import TopicsStore from '../stores/TopicsStore';
import TopicsActions from '../actions/TopicsActions';

class Topics extends React.Component {
	constructor(props) {
		super(props);
		this.state = TopicsStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		TopicsStore.listen(this.onChange);
		TopicsActions.getTopics();
	}

	componentWillUnmount() {
		TopicsStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);
	}

	render() {
		let topicsList = this.state.topics.list.map((topic, index) => {
			return (
				<tr key={topic.id}>
					<td>{topic.date}</td>
					<td>{topic.title}</td>
				</tr>
			);
		});
		return (
			<div className="ali-info">
				<div className="title">{this.state.topics.title}</div>
				<div className="content">
					<table className="info-table">
						<tbody>{topicsList}</tbody>
					</table>
					<div className="more">阅读全部</div>
				</div>
			</div>
		);
	}
}

export default Topics;