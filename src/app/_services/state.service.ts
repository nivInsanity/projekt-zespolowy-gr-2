import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {State} from '../_models/State.model';
import {Product} from '../_models/Product.model';
import {Category} from '../_models/Category.model';
import {StorageService} from './storage.service';
import {LoadingController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})


export class StateService {
  state = new State({
      loading: true,
      categories: [],
      products: []
    }
  );

  loading: HTMLIonLoadingElement;

  loading$: BehaviorSubject<boolean> = new BehaviorSubject(this.state.loading);
  categories$: BehaviorSubject<Array<Category>> = new BehaviorSubject(this.state.categories);
  products$: BehaviorSubject<Array<Product>> = new BehaviorSubject(this.state.products);

  constructor(private storage: StorageService, private loadingCtrl: LoadingController) {
    storage.init().then(() => {
      const promises = [];

      promises.push([
        storage.get('categories').then(categories => {
          if (categories) {
            this.categories$.next(categories);
          }
        }),
        storage.get('products').then(products => {
          if (products) {
            this.products$.next(products);
          }
        })
      ]);

      Promise.all(promises).then(() => {
        console.log('loading false');
        this.loading$.next(false);
      });
    });
  }

  addCategory(category: Category) {
    this.categories$.next([
      ...this.categories$.getValue(),
      category
    ]);

    return this.saveCategories();
  }

  removeCategory(uuid: string) {
    this.categories$.next(
      this.categories$.getValue().filter(category => (category.uuid !== uuid))
    );

    this.products$.next(
      this.products$.getValue().filter(product => (product.categoryId !== uuid))
    );

    this.saveCategories();
    this.saveProducts();
  }


  saveCategories() {
    const categories = this.categories$.getValue();

    this.loading$.next(true);
    return this.storage.set('categories', categories).then(() => {
      this.loading$.next(false);
    });
  }

  addProduct(product: Product) {
    this.products$.next([
      ...this.products$.getValue(),
      product
    ]);

    return this.saveProducts();
  }

  removeProduct(uuid: string) {
    this.products$.next(
      this.products$.getValue().filter(product => (product.uuid !== uuid))
    );

    return this.saveProducts();
  }


  saveProducts() {
    const products = this.products$.getValue();

    this.loading$.next(true);
    return this.storage.set('products', products).then(() => {
      this.loading$.next(false);
    });
  }
}

