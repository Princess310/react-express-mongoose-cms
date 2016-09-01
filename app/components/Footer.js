import React from 'react';
import {Link} from 'react-router';

class Footer extends React.Component {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
	}

	onChange(state) {
		this.setState(state);
	}

	render() {
		return (
			<footer className="ali-footer">
				<div className="footer-content">
					<div className="logo-icon"></div>
					<div className="lin-wrapper">
						<Link to="/news">邀约动态</Link>
						<Link to="/about">关于阿里</Link>
						<Link to="/contacts">联系我们</Link>
						<Link to="/service">服务条款</Link>
					</div>
					<div className="copy-right">
						COPYTRIGHT © yaoyue.net.cn 阿里健网络科技集团 版权所有 蜀ICP备16015418号-1
					</div>
				</div>
			</footer>
		);
	}
}

export default Footer;