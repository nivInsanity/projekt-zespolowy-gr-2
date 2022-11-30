import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage-angular';
import {ToastController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class ToastService {
  constructor(private toast: ToastController) {
  }

  async show(message: string, position: 'top' | 'middle' | 'bottom' = 'bottom', duration: number = 1500) {
    const toast = await this.toast.create({
      message,
      duration,
      position
    });

    await toast.present();
  }
}
