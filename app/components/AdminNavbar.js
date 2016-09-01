import React from 'react';
import {Link} from 'react-router';
import NavLink from './NavLink';
import AdminNavbarStore from '../stores/AdminNavbarStore';
import AdminNavbarActions from '../actions/AdminNavbarActions';

class AdminNavbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = AdminNavbarStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		AdminNavbarStore.listen(this.onChange);
	}

	componentWillUnmount() {
		AdminNavbarStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);
	}

	render() {
		return (
			<nav className="navbar navbar-default admin-navbar">
			    <div className="navbar-header">
			      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
			        <span className="sr-only">Toggle navigation</span>
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>
			      </button>
			      <a className="navbar-brand" href="#">AliJian</a>
			    </div>
			    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
			      <ul className="nav navbar-nav">
			        <li><NavLink to="/admin">首页</NavLink></li>
			        <li><NavLink to="/admin/news">新闻</NavLink></li>
			      </ul>
			      <ul className="nav navbar-nav navbar-right">
			        <li className="dropdown">
			          <a className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></a>
			          <ul className="dropdown-menu">
			            <li><a>Action</a></li>
			            <li><a>Another action</a></li>
			            <li><a>Something else here</a></li>
			            <li role="separator" className="divider"></li>
			            <li><a>Separated link</a></li>
			          </ul>
			        </li>
			      </ul>
			    </div>
			</nav>
		);
	}
}

export default AdminNavbar;