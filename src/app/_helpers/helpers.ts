import {Product} from '../_models/Product.model';

export const getExpirationDays = (product: Product) => {
  return Math.round(( product.validityDate.getTime() - new Date().getTime() ) / (1000 * 3600 * 24));
}
