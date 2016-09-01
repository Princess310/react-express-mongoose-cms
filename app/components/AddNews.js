import React from 'react';
import NewsPanel from './NewsPanel';

class AddNews extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<NewsPanel action="add" id=""></NewsPanel>
		);
	}
}

export default AddNews;