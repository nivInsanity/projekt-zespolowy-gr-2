export class Location {
  uuid: string;
  name: string;

  constructor(location: Location) {
    this.uuid = location.uuid;
    this.name = location.name;
  }
}
