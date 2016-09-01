import React from 'react';
import {Link} from 'react-router';
import CardListStore from '../stores/CardListStore';
import CardListActions from '../actions/CardListActions';

class CardList extends React.Component {
	constructor(props) {
		super(props);
		this.state = CardListStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		CardListStore.listen(this.onChange);
		CardListActions.getCardList();
	}

	componentDidUpdate() {
		$('.magnific-popup').magnificPopup({
			type: 'image',
			mainClass: 'mfp-zoom-in',
			closeOnContentClick: true,
			midClick: true,
			zoom: {
				enabled: true,
				duration: 300
			}
		});
	}

	componentWillUnmount() {
		CardListStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);
	}

	render() {
		let cardList = this.state.list.map((card, index) => {
			return (
				<div key={card.id} className="ali-card">
					<a className='magnific-popup' href={card.img}>
						<img src={card.img} />
					</a>
					<div className="des">
						{card.brief}
					</div>
				</div>
			);
		});
		return (
			<div className="flex-bt mt-50">
				{cardList}
			</div>
		);
	}
}

export default CardList;