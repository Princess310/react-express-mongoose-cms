import React from 'react';
import {Link} from 'react-router';
import {each} from 'underscore';
import NavLink from './NavLink';
import ActionPanelStore from '../stores/ActionPanelStore';
import ActionPanelActions from '../actions/ActionPanelActions';

class ActionPanel extends React.Component {
	constructor(props) {
		super(props);
		this.state = ActionPanelStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		ActionPanelStore.listen(this.onChange);
	}

	componentWillUnmount() {
		ActionPanelStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);
	}

	render() {
		let { type, part } = this.props;
		let navs = this.state.navs[type].content;
		let list = [];

		each(navs, function(v, k){
			list.push({
				link: type + "/" +k,
				name: v
			});
		});

		let navList = list.map(( item, index ) => {
			return (
				<li key={item.link}><NavLink to={"/web/board/" + item.link}>{item.name}</NavLink></li>
			);
		});

		return (
			<div className="ActionPanel">
				<header className="title">{type.replace(/(\w)/,function(v){return v.toUpperCase()})}</header>
				<ul className="content">
					{navList}
				</ul>
			</div>
		);
	}
}

export default ActionPanel;