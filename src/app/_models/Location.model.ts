import {v4 as uuidv4} from 'uuid';

export class Location {
  uuid?: string;
  name: string = '';
  default: boolean = false;

  constructor(location?: Location) {
    this.uuid = uuidv4();

    if(location) {
      if (location.uuid) {
        this.uuid = location.uuid;
        this.default = location.default;
      }

      this.name = location.name;
    }
  }
}
