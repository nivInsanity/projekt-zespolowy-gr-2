import {v4 as uuidv4} from 'uuid';

export class Product {
  uuid?: string;
  name: string;
  description: string;
  categoryId: string;
  validityData: Date;

  constructor(product?: Product) {
    this.uuid = uuidv4();

    if (product) {
      if (product.uuid) {
        this.uuid = product.uuid;
      } else {
        this.uuid = uuidv4();
      }

      this.name = product.name;
      this.description = product.description;
      this.categoryId = product.categoryId;
      this.validityData = product.validityData;
    } else {
      this.uuid = uuidv4();
    }
  }
};
