import React from 'react';
import {Link} from 'react-router';
import SwiperView from './SwiperView';
import Brief from './Brief';
import Topics from './Topics';
import CardList from './CardList';
import Product from './Product';
import HomeStore from '../stores/HomeStore';
import HomeActions from '../actions/HomeActions';

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = HomeStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		HomeStore.listen(this.onChange);
	}

	componentWillUnmount() {
		HomeStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);
	}

	render() {
		return (
			<div>
				<SwiperView />
				<div className="ali-bg-content flex-bt" style={{marginTop: '105px'}}>
					<Brief />
					<Topics />
				</div>
				<div className="ali-bg-content" style={{marginTop: '100px'}}>
					<div className="ali-title">近期特别</div>
					<CardList></CardList>
				</div>
				<Product />
			</div>
		);
	}
}

export default Home;