import { v4 as uuidv4 } from 'uuid';

export class Category {
  uuid?: string;
  name: string;
  description: string;

  constructor(cat: Category) {
    this.uuid = uuidv4();
    this.name = cat.name;
    this.description = cat.description;
  }

};
