import {Product} from '../_models/Product.model';
import {Category} from '../_models/Category.model';

export class Helpers {
  getExpirationDays(product: Product) {
    return Math.round(( product.validityDate.getTime() - new Date().getTime() ) / (1000 * 3600 * 24));
  }

  getDefaultCategory(categories: Array<Category>): Category {
    return categories.find(c => c.default);
  }
}


