import React from 'react';
import {Link} from 'react-router';
import AboutListStore from '../stores/AboutListStore';
import AboutListActions from '../actions/AboutListActions';

class AboutList extends React.Component {
	constructor(props) {
		super(props);
		this.state = AboutListStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		AboutListStore.listen(this.onChange);
	}

	componentWillUnmount() {
		AboutListStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);
	}

	render() {
		return (
			<div className="AboutList">
				<div className="item">
					<img src="../../../img/card2.png" />
					<div className="content">
					 	<Link to="/web/board/about/default/1" className="title">张靖豪</Link>
					 	<article>阿里健投资控股集团董事长，中国著名企业家，《邀约》创始人、国内著名青年创阿里健集团网络科技有限公司董事长兼行政官张靖豪先生，于2016年8月3日考察了该项目，并明确表示对于该项目的大力支持和关注,集团网络科技有限公司董事长兼行政官张靖豪先生，于2016年......</article>
					</div>
				</div>
			</div>
		);
	}
}

export default AboutList;