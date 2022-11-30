import {Product} from './Product.model';
import {Category} from './Category.model';
import {Location} from "./Location.model";

export class State {
  loading = false;
  categories: Array<Category> = [];
  products: Array<Product> = [];
  locations: Array<Location> = [];

  constructor(state: State) {
      if(state) {
        this.loading = state.loading;
        this.categories = state.categories;
        this.products = state.products;
      }
  }

}
