import { Injectable } from '@angular/core';
import { LedgerService } from './../../../../../services/ledger/ledger.service';
import { ProductService } from './../../../../../services/product/product.service';
import { BundleService } from './../../../../../services/bundle/bundle.service';
import { ApiService } from '../../../../../services/api/api.service';
import { GeneralItem } from './../../../../../interface/general-item.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { Bundle } from '../../../../../interface/bundle.interface';
import { Ledger } from '../../../../../interface/ledger.interface';
import { Product } from '../../../../../interface/product.interface';
import { MyLocationStoreService } from '../../../../../services/myLocation/my-location.service';
import { BaseService } from '../../../../../class/BaseService';
import { HOUR } from '../../../../../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class GeneralItemStoreService extends BaseService<GeneralItem> {
  protected fetch(): void {
    const mylocationId = this.myLocationService.snapshot.selected.id;

    this.apiService
      .retrieve<GeneralItem[]>('general-items', {
        locationId: mylocationId.toString(),
      })
      .subscribe({
        next: (res) => (this.store(res)),
        error: (err) => {
          this._data.next([]);
          console.error(err);
        },
      });
  }
  public create(data: GeneralItem): Observable<GeneralItem> {
    throw new Error('Method not implemented.');
  }
  public update(data: GeneralItem): Observable<GeneralItem> {
    throw new Error('Method not implemented.');
  }
  public delete(id: number): Observable<any> {
    throw new Error('Method not implemented.');
  }

  constructor(
    private ledgerService: LedgerService,
    private productService: ProductService,
    private bundleService: BundleService,
    private apiService: ApiService,
    private myLocationService: MyLocationStoreService
  ) {
    super('general-items', HOUR);
    this.ledgerService.init();
    this.productService.init();
    this.bundleService.init();
  }


  selectActualItem(item: GeneralItem): Product | Ledger | Bundle {
    switch (item.type) {
      case 'PRODUCT':
        return this.productService.getElementById(item.id);
      case 'LEDGER':
        return this.ledgerService.getElementById(item.id);
      default:
        return this.bundleService.getElementById(item.id);
    }
  }
}
