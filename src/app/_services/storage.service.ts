import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storage: Storage;

  constructor(private ionicStorage: Storage) { }

  async init() {
    this.storage = await this.ionicStorage.create();
  }

  set(key: string, value: any) {
    return this.storage?.set(key, value);
  }

  get(key: string) {
    return this.storage?.get(key);
  }
}
