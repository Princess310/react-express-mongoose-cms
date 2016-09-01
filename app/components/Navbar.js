import React from 'react';
import {Link} from 'react-router';
import NavLink from './NavLink';
import NavbarStore from '../stores/NavbarStore';
import NavbarActions from '../actions/NavbarActions';

class Navbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = NavbarStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		NavbarStore.listen(this.onChange);
		NavbarActions.getNavTypes();
	}

	componentWillUnmount() {
		NavbarStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);
	}

	render() {
		let navs = this.state.navTypes.map((navType, index) => {
			return (
				<li key={navType.navTypeId}><NavLink to={"/web/board/" + navType.type + "/default"}>{navType.name}</NavLink></li>
			)
		});

		return (
			<header className="ali-header">
				<div className="header-container">
					<Link to="/"> 
						<div className="logo"alt="Logo"></div>
					</Link>
					<nav className="ali-nav">
						<ul>
							<li><NavLink to="/web">首页</NavLink></li>
							{navs}
						</ul>
					</nav>

					<div className="search-wrapper">
						<div className="icon"><span className="glyphicon glyphicon-search"></span></div>
						<input className="ali-input" type="text" placeholder="搜索" />
					</div>

					<div className="ali-nav-mobile">
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
					</div>
				</div>
			</header>
		);
	}
}

export default Navbar;