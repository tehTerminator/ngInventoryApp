import { Injectable } from '@angular/core';
import { LedgerService } from './../../../../../services/ledger/ledger.service';
import { ProductService } from './../../../../../services/product/product.service';
import { BundleService } from './../../../../../services/bundle/bundle.service';
import { ApiService } from '../../../../../services/api/api.service';
import { GeneralItem } from './../../../../../interface/general-item';
import { BehaviorSubject, Observable } from 'rxjs';
import { Bundle } from '../../../../../interface/bundles.interface';
import { Ledger } from '../../../../..interface/ledger.interface';
import { Product } from '../../../../../interface/product.interface';

@Injectable({
  providedIn: 'root',
})
export class GeneralItemStoreService {
  private data: GeneralItem[] = [];

  constructor(
    private ledgerService: LedgerService,
    private productService: ProductService,
    private bundleService: BundleService,
    private apiService: ApiService
  ) {}

  init(): void {
    this.ledgerService.init();
    this.productService.init();
    this.bundleService.init();

    this.apiService.retrieve<GeneralItem[]>('general-items').subscribe({
      next: (res) => (this.data = res),
      error: (err) => {
        console.log(err);
        this.data = [];
      },
    });
  }

  get items(): GeneralItem[] {
    return this.data;
  }

  selectActualItem(item: GeneralItem): Product | Ledger | Bundle {
    switch (item.type) {
      case 'PRODUCT':
        return this.productService.getElementById(item.id) as Product;
      case 'LEDGER':
        return this.ledgerService.getElementById(item.id) as Ledger;
      default:
        return this.bundleService.getElementById(item.id) as Bundle;
    }
  }
}
