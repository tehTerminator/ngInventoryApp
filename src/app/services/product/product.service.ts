import { Injectable } from '@angular/core';
import { HOUR } from './../../interface/collection';
import { BaseService } from './../../class/BaseService';
import { ApiService } from './../api/api.service';
import { tap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NotificationsService } from '../notification/notification.service';
import { Product } from './../../interface/product'; 
import { AuthStoreService } from '../auth-store/auth-store.service';
import { MyLocationStoreService } from './../myLocation/my-location.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService<Product> {

  constructor(
    private api: ApiService, 
    private authStore: AuthStoreService,
    private locationStore: MyLocationStoreService,
    private notificationService: NotificationsService
  ) {
    super('products', HOUR);
  }

  protected fetch(): void {
    this.api.retrieve<Product[]>(this.table).subscribe({
      next: (products => this.store(products)),
      error: (error => {
        this._data.next([]);
        this.notificationService.show('An Error Occurred While Fetching Data');
        console.log(error);
      })
    });
  }

  create(product: Product): Observable<Product> {
    return this.api.create<Product>(this.table, product)
    .pipe(tap(response => {
      this.insert(response);
    }));
  }

  update(product: Product): Observable<Product> {
    return this.api.update<Product>(this.table, product)
    .pipe(
      tap(
        response => this.updateItem(response)
      ),
      catchError(
        error => {
          console.log(error);
          throw new Error('Unable to Update Product');
        }
      )
    );
  }

  delete(index: number): Observable<any> {
    try{
      const item = this.get(index);
      return this.api.delete<any>(this.table, item.id)
      .pipe(
        tap(() => this.deleteItem(index))
      );
    } catch (e) {
      throw new Error('Item Not Found');
    }
  }
}
