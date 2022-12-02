import {v4 as uuidv4} from 'uuid';

export class Location {
  uuid?: string;
  name: string = '';

  constructor(location?: Location) {
    this.uuid = uuidv4();

    if(location) {
      if (location.uuid) {
        this.uuid = location.uuid;
      }

      this.name = location.name;
    }
  }
}
