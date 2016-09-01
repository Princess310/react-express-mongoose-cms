import alt from '../alt';
import DashboardBarActions from '../actions/DashboardBarActions';

class DashboardBarStore {
	constructor() {
		this.bindActions(DashboardBarActions);

		this.navs = {
			news: {
				title: "新闻中心",
				content: {
					'default': "集团新闻",
					'area': "地区公司新闻",
					'branch': "下属公司新闻",
					'media': "媒体关注"
				}
			},
			about: {
				title: "关于阿里健",
				content: {
					'default': "集团介绍",
					'team': "领导团队",
					'company': "企业文化"
				}
			}
		};
	}
}

export default alt.createStore(DashboardBarStore);