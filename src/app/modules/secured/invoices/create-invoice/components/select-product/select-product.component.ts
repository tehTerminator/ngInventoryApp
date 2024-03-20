import { Component, OnInit } from '@angular/core';
import { InvoiceStoreService } from '../../../services/invoice-store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ApiService } from './../../../../../../services/api/api.service';
import { MyLocationStoreService } from './../../../../../../services/myLocation/my-location.service';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Product } from '../../../../../../interface/product.interface';
import { StockInfo } from '../../../../../../interface/stock-info.interface';
import { StoreLocation } from '../../../../../../interface/location.interface';

@Component({
  selector: 'app-select-product',
  templateUrl: './select-product.component.html',
  styleUrls: ['./select-product.component.scss'],
})
export class SelectProductComponent implements OnInit {
  productControl = new FormControl();
  private _products = new BehaviorSubject<StockInfo[]>([]);
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private myLocationStore: MyLocationStoreService,
    private store: InvoiceStoreService
  ) {}

  ngOnInit(): void {
    const storeLocation = this.myLocationStore.snapshot.selected;
    this.loadProducts(storeLocation);
  }

  onSelectProduct() {
    // Get the selected product from the form control
    const selectedProduct: Product = this.productControl.value;

    if (!!selectedProduct) {
      this.store.product.next(selectedProduct);
      this.navigateToCreateTransactions();
    }
  }

  loadProducts(value: StoreLocation): void {
    console.log('Load Product Called');
    this.api
      .retrieve<StockInfo[]>(['location', 'inventory'], {
        id: value.id.toString(),
      })
      .subscribe({
        next: (value) => this._products.next(value),
      });
  }

  navigateToCreateTransactions() {
    // Get the current :type parameter from the route

    // Navigate to the relative path for select-product
    this.router.navigate(['../create-transactions'], {
      relativeTo: this.route,
    });
  }

  get products$(): Observable<StockInfo[]> {
    return this._products;
  }

  get hasTransactions(): Observable<boolean> {
    return this.store.invoice.pipe(
      map((value) => {
        return value.transactions.length >= 1
      })
    );
  }
}
