import React from 'react';
import {Link} from 'react-router';
import DashboardBarStore from '../stores/DashboardBarStore';
import DashboardBarActions from '../actions/DashboardBarActions';

class DashboardBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = DashboardBarStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		DashboardBarStore.listen(this.onChange);
	}

	componentWillUnmount() {
		DashboardBarStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);
	}

	render() {
		let { type, part } = this.props;
		let title = this.state.navs[type].title;
		let name = this.state.navs[type].content[part];

		return (
			<div className="DashboardBar">
				<div className="ali-bg-content">
					<span className="glyphicon glyphicon-home"></span>
					<span className="title">{ title }</span>-
					<span className="current">{ name }</span>
				</div>
			</div>
		);
	}
}

export default DashboardBar;