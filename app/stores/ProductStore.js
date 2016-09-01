import alt from '../alt';
import ProductActions from '../actions/ProductActions';

class ProductStore {
	constructor() {
		this.bindActions(ProductActions);
	}
}

export default alt.createStore(ProductStore);