import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {State} from '../_models/State.model';
import {Product} from '../_models/Product.model';
import {Category} from '../_models/Category.model';
import {StorageService} from './storage.service';
import {LoadingController} from '@ionic/angular';
import {Location} from "../_models/Location.model";

@Injectable({
  providedIn: 'root'
})

export class StateService {
  state = new State({
      loading: true,
      categories: [],
      products: [],
      locations: []
    }
  );

  loading: HTMLIonLoadingElement;

  loading$: BehaviorSubject<boolean> = new BehaviorSubject(this.state.loading);
  categories$: BehaviorSubject<Array<Category>> = new BehaviorSubject(this.state.categories);
  products$: BehaviorSubject<Array<Product>> = new BehaviorSubject(this.state.products);
  locations$: BehaviorSubject<Array<Location>> = new BehaviorSubject<Array<Location>>(this.state.locations);

  constructor(private storage: StorageService, private loadingCtrl: LoadingController) {
    storage.init().then(() => {
      const promises = [];

      promises.push([
        storage.get('categories').then(categories => {
          if (categories) {
            //this.categories$.next(categories);
            this.categories$.next(categories.map(category => new Category(category)));
          }
        }),
        storage.get('products').then(products => {
          if (products) {
            //this.products$.next(products);
            this.products$.next(products.map(product => new Product(product)));
          }
        }),
        storage.get('locations').then(locations => {
          if (locations) {
            //this.locations$.next(locations);
            this.locations$.next(locations.map(location => new Location(location)));
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

    if(category.default) {
      this.categories$.getValue().map(cat => {
        if(cat.uuid !== category.uuid) {
          cat.default = false; // Ustawienie default na false dla pozostałych lokalizacji
        }
      });
    }

    return this.saveCategories();
  }

  editCategory(category: Category) {
    this.categories$.next(this.categories$.getValue().map(cat => cat.uuid === category.uuid ? category : cat));

    if(category.default) {
      this.categories$.getValue().map(cat => {
        if(cat.uuid !== category.uuid) {
          cat.default = false; // Ustawienie default na false dla pozostałych lokalizacji
        }
      });
    }

    return this.saveCategories();
  }

  removeCategory(uuid: string) {
    this.categories$.next(
      this.categories$.getValue().map(category => (category.uuid === uuid ? {...category, deleted: true } : category))
    );

    this.products$.next(
      this.products$.getValue().map(product => (product.categoryId === uuid ? {...product, deleted: true} : product))
    );

    this.saveCategories();
    this.saveProducts();
  }

  restoreCategory(uuid: string) {
    this.categories$.next(
      this.categories$.getValue().map(category => (category.uuid === uuid ? {...category, deleted: false} : category))
    );

    return this.saveCategories();
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

  editProduct(product: Product) {
    this.products$.next(this.products$.getValue().map(prod => prod.uuid === product.uuid ? product : prod));

    return this.saveProducts();
  }

  removeProduct(uuid: string) {
    this.products$.next(
      this.products$.getValue().map(product => (product.uuid === uuid ? {...product, deleted: true} : product))
    );

    return this.saveProducts();
  }

  restoreProduct(uuid: string) {
    this.products$.next(
      this.products$.getValue().map(product => (product.uuid === uuid ? {...product, deleted: false} : product))
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

  addLocation(location: Location) {
    this.locations$.next([
      ...this.locations$.getValue(),
      location
    ]);

    if(location.default) {
      this.locations$.getValue().map(loc => {
        if(loc.uuid !== location.uuid) {
          loc.default = false; // Ustawienie default na false dla pozostałych lokalizacji
        }
      });
    }

    return this.saveLocations();
  }

  editLocation(location: Location) {
    this.locations$.next(this.locations$.getValue().map(loc => loc.uuid === location.uuid ? location : loc));

    if(location.default) {
      this.locations$.getValue().map(loc => {
        if(loc.uuid !== location.uuid) {
          loc.default = false; // Ustawienie default na false dla pozostałych lokalizacji
        }
      });
    }

    return this.saveLocations();
  }

  saveLocations() {
    const locations = this.locations$.getValue();

    this.loading$.next(true);
    return this.storage.set('locations', locations).then(() => {
      this.loading$.next(false);
    });
  }

  removeLocation(uuid: string) {
    this.locations$.next(
      this.locations$.getValue().filter(location => (location.uuid !== uuid))
    );

    this.saveLocations();
  }
}

