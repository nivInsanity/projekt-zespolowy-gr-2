import { v4 as uuidv4 } from 'uuid';

export class Category {
  uuid?: string;
  name: string;
  description: string;
  notifyDays: number;

  constructor(cat: Category) {
    this.uuid = uuidv4();
    this.name = cat.name;
    this.description = cat.description;
    this.notifyDays = cat.notifyDays;
  }

  // edit? = (data: {name: string; description: string; notifyDays: number}) => {
  //   this.name = data.name;
  //   this.description = data.description;
  //   this.notifyDays = data.notifyDays;
  // };
};
