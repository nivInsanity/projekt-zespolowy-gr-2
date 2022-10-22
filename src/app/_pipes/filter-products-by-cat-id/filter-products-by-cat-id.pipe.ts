import { Pipe, PipeTransform } from '@angular/core';
import {Product} from "../../_models/Product.model";

@Pipe({
  name: 'filterProductsByCatId'
})
export class FilterProductsByCatIdPipe implements PipeTransform {

  transform(value: Array<Product>, ...args: unknown[]): unknown {
    console.log('value', value);
    console.log('args', args);

    return value.filter(product => (product.categoryId === args[0]));
  }

}
