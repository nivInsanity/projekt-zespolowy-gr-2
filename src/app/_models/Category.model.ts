import {v4 as uuidv4} from 'uuid';

export class Category {
  uuid?: string;
  name: string = '';
  description: string = '';
  notifyDays: number = 7;
  default: boolean = false;

  constructor(cat?: Category) {
    this.uuid = uuidv4();

    if (cat) {
      if (cat.uuid) {
        this.uuid = cat.uuid;
      }

      this.name = cat.name;
      this.description = cat.description;
      this.notifyDays = cat.notifyDays;
      this.default = cat.default;
    }
  }
};
