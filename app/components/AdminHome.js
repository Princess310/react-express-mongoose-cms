import React from 'react';
import {Link} from 'react-router';
import AdminHomeStore from '../stores/AdminHomeStore';
import AdminHomeActions from '../actions/AdminHomeActions';

class AdminHome extends React.Component {
	constructor(props) {
		super(props);
		this.state = AdminHomeStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		AdminHomeStore.listen(this.onChange);
	}

	componentWillUnmount() {
		AdminHomeStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);
	}

	render() {
		return (
			<div>Admin Home here</div>
		);
	}
}

export default AdminHome;