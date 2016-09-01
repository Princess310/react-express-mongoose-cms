import React from 'react';
import {Link} from 'react-router';
import DashboardBar from './DashboardBar';
import ActionPanel from './ActionPanel';
import NewsList from './NewsList';
import NewsInfo from './NewsInfo';
import AboutList from './AboutList';
import About from './About';
import DahboardStore from '../stores/DahboardStore';
import DahboardActions from '../actions/DahboardActions';

class Dahboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = DahboardStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		DahboardStore.listen(this.onChange);
	}

	componentWillUnmount() {
		DahboardStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);
	}

	render() {
		const { type, part, id } = this.props.params;
		let MainComponent;

		if(type == "news"){
			MainComponent = <NewsList part={part} />;

			if(id){
				MainComponent = <NewsInfo id={id} />;
			}
		}else if(type == "about"){
			MainComponent = <AboutList />;

			if(id){
				MainComponent = <About />;
			}
		}

		return (
			<div className="Dashboard">
				<DashboardBar type={type} part={part} />
				<div className="ali-bg-content">
					<div className="Main">
						{MainComponent}
					</div>
					<ActionPanel type={type} part={part} />
				</div>
			</div>
		);
	}
}

export default Dahboard;