import { v4 as uuidv4 } from 'uuid';

export class Product {
  uuid?: string;
  name: string;
  description: string;
  categoryId: string;
  validityData: string;

  constructor(product?: Product) {
    this.uuid = uuidv4();

    if(product) {
      this.name = product.name;
      this.description = product.description;
      this.categoryId = product.categoryId;
      this.validityData = product.validityData;
    }
  }
};
