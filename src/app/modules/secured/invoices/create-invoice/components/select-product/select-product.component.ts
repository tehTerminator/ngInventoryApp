import { Component, OnDestroy, OnInit } from '@angular/core';
import { InvoiceStoreService } from '../../../services/invoice-store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ApiService } from './../../../../../../services/api/api.service';
import { Observable, Subscription, map } from 'rxjs';
import { GeneralItem } from '../../../../../../interface/general-item.interface';
import { GeneralItemStoreService } from '../../services/general-item-store.service';
import { Product } from '../../../../../../interface/product.interface';
import { ProductService } from '../../../../../../services/product/product.service';

@Component({
  selector: 'app-select-product',
  templateUrl: './select-product.component.html',
  styleUrls: ['./select-product.component.scss'],
})
export class SelectProductComponent implements OnInit, OnDestroy {
  productControl = new FormControl<GeneralItem | null>(null);
  private type = 'SALES';
  private _sub = new Subscription();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: InvoiceStoreService,
    private generalItemStore: GeneralItemStoreService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.generalItemStore.init();
    this.productService.init();
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe;
  }

  onSelectProduct() {
    // Get the selected product from the form control
    const selectedProduct: GeneralItem | null = this.productControl.value;

    if (!!selectedProduct) {
      this.store.selectedItem = this.generalItemStore.selectActualItem(selectedProduct);
      this.navigateToCreateTransactions();
    }
  }

  private navigateToCreateTransactions() {
    this.router.navigate(['../create-transactions'], {
      relativeTo: this.route,
    });
  }

  get products$(): Observable<GeneralItem[] | Product[]> {
    if ( this.store.kind === 'SALES' ) {
      return this.generalItemStore.getAsObservable();
    } 
    return this.productService.getAsObservable();
  }

  get hasTransactions(): Observable<boolean> {
    return this.store.invoice.pipe(
      map((value) => {
        return value.transactions.length >= 1
      })
    );
  }
}
