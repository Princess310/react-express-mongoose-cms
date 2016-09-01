import React from 'react';
import NewsPanel from './NewsPanel';

class UpdateNews extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let { id } = this.props.params;

		return (
			<NewsPanel action="update" id={id}></NewsPanel>
		);
	}
}

export default UpdateNews;