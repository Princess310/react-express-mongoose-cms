import React from 'react';
import {Link} from 'react-router';
import BriefStore from '../stores/BriefStore';
import BriefActions from '../actions/BriefActions';

class Brief extends React.Component {
	constructor(props) {
		super(props);
		this.state = BriefStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		BriefStore.listen(this.onChange);
		BriefActions.getBrief();
	}

	componentWillUnmount() {
		BriefStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);
	}

	render() {
		return (
			<div className="ali-info">
				<div className="title">{this.state.brief.title}</div>
				<div className="content words">{this.state.brief.content}</div>
			</div>
		);
	}
}

export default Brief;