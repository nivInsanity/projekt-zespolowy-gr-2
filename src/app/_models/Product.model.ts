import {v4 as uuidv4} from 'uuid';

export class Product {
  uuid?: string = null;
  name: string = '';
  description: string = '';
  categoryId: string = null;
  locationId: string = null;
  validityDate: Date = new Date();

  constructor(product?: Product) {
    this.uuid = uuidv4();

    if (product) {
      if (product.uuid) {
        this.uuid = product.uuid;
      }

      this.name = product.name;
      this.description = product.description;
      this.categoryId = product.categoryId;
      this.validityDate = new Date(product.validityDate);
    } else {
      this.validityDate = new Date();
      this.validityDate.setDate(this.validityDate.getDate() + 365);
    }
  }
};
