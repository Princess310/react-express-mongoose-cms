import React from 'react';
import {Link} from 'react-router';
import ProductStore from '../stores/ProductStore';
import BriefActions from '../actions/ProductActions';

class Product extends React.Component {
	constructor(props) {
		super(props);
		this.state = ProductStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		ProductStore.listen(this.onChange);
	}

	componentWillUnmount() {
		ProductStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);
	}

	render() {
		return (
			<div>
				<div className="bg-grey" style={{paddingTop: '20px'}}>
					<div className="ali-bg-content">
						<div className="ali-title" style={{marginBottom: '108px'}}>近期项目</div>
						<div className="ali-product">
							<header>
								<div className="title">
									<img src="img/yaoyue-icon.png" />
									<span className="name">邀约APP 随时随地高效邀约</span>
								</div>
								<div>The four major features, offer efficient.</div>
							</header>
							<article className="content">
								<div className="info-wrapper">
									<div className="item">
										<img src ="img/check-icon.png" />
										<span>商务社交商机无限</span>
									</div>
									<div className="item">
										<img src ="img/check-icon.png" />
										<span>同城匹配自动推荐</span>
									</div>
									<div className="item">
										<img src ="img/check-icon.png" />
										<span>线上邀约线下面谈</span>
									</div>
									<div className="item">
										<img src ="img/check-icon.png" />
										<span>简单直接真实互联</span>
									</div>

									<div className="ali-btn green" style={{marginTop: '48px'}}>了解详情</div>
								</div>
								<img className="product-img" src="img/product.png" />
							</article>
							<footer className="more">
								<div className="title">
									<div className="name">APP功能扩展</div>
									<div>App function extension</div>
								</div>
								<div className="container">
									<div className="item">
										<span className="dot"></span>
										面谈事件
									</div>
									<div className="item">
										<span className="dot"></span>
										商业服务体系
									</div>
									<div className="item">
										<span className="dot"></span>
										企业管理工具
									</div>
									<div className="item">
										<span className="dot"></span>
										虚拟增强现实
									</div>
									<div className="item">
										<span className="dot"></span>
										可视通话直播
									</div>
									<div className="item">
										<span className="dot"></span>
										智能客服
									</div>
								</div>
							</footer>
						</div>
					</div>
				</div>
				<div className="ali-bg-content" style={{marginTop: '80px'}}>
					<div className="ali-title">旗下公司</div>
					<div className="ali-gallery">
						<div className="item">
							<img src="img/logo-icon.png" />
							<div className="name">杭州玉女粉生物科技有限公司</div>
						</div>
						<div className="item">
							<img src="img/logo-icon.png" />
							<div className="name">成都百岁堂贸易有限公司</div>
						</div>
						<div className="item">
							<img src="img/logo-icon.png" />
							<div className="name">阿里健网络科技集团有限公司</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Product;