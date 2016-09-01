import React from 'react';
import {Link} from 'react-router';
import {isEqual} from 'underscore';
import SwiperViewStore from '../stores/SwiperViewStore';
import SwiperViewActions from '../actions/SwiperViewActions';

class SwiperView extends React.Component {
	constructor(props) {
		super(props);
		this.state = SwiperViewStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		SwiperViewStore.listen(this.onChange);
		SwiperViewActions.getImgList();
	}

	componentDidUpdate(){
		Swiper('.swiper-container', {
			effect : 'coverflow',
			slidesPerView: 3,
			centeredSlides: true,
			coverflow: {
				rotate: 0,
				stretch: 0,
				depth: 0,
				modifier: 2,
				slideShadows : true
			},
			initialSlide: 1,
			prevButton:'.swiper-button-prev',
			nextButton:'.swiper-button-next',
			keyboardControl : true,
		});
	}

	componentWillUnmount() {
		SwiperViewStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);
	}

	render() {
		let imgList = this.state.imgList.map((img, index) => {
			return (
				<div key={index} className={"swiper-slide slide-panel-" + index}>
					<img src={img} />
				</div>
			)
		});

		return (
			<div className="swiper-container">
				<div className="swiper-wrapper">
					{imgList}
				</div>
				<div className="swiper-button-prev"></div>
				<div className="swiper-button-next"></div>
				<div className="swiper-pagination"></div>
			</div>
		);
	}
}

export default SwiperView;