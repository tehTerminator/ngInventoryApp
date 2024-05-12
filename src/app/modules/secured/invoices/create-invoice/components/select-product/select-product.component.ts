import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { InvoiceStoreService } from '../../../services/invoice-store.service';
import {
  Observable,
  Subscription,
  map,
  startWith,
  debounceTime,
  EMPTY,
} from 'rxjs';
import { GeneralItem } from '../../../../../../interface/general-item.interface';
import { GeneralItemStoreService } from '../../services/general-item-store.service';
import { Product } from '../../../../../../interface/product.interface';
import { ProductService } from '../../../../../../services/product/product.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { NotificationsService } from '../../../../../../services/notification/notification.service';
import { LedgerService } from '../../../../../../services/ledger/ledger.service';
import { TransactionForm } from './TransactionForm';
import { BundleService } from '../../../../../../services/bundle/bundle.service';
import { Bundle } from '../../../../../../interface/bundle.interface';
import { Ledger } from '../../../../../../interface/ledger.interface';

@Component({
  selector: 'app-select-product',
  templateUrl: './select-product.component.html',
  styleUrls: ['./select-product.component.scss'],
})
export class SelectProductComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('firstInputField') input!: ElementRef<HTMLInputElement>;
  productForm = new TransactionForm();
  filteredProducts$: Observable<GeneralItem[] | Product[]> = EMPTY;
  isBundle = false;
  private _sub = new Subscription();

  constructor(
    private store: InvoiceStoreService,
    private generalItemStore: GeneralItemStoreService,
    private productService: ProductService,
    private ledgerService: LedgerService,
    private notification: NotificationsService,
    private bundleService: BundleService
  ) {}

  ngOnInit(): void {
    this.generalItemStore.init();
    this.productService.init();
    this.ledgerService.init();

    // Combine observable streams for product options
    this.filteredProducts$ = this.productForm.itemFormControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300), // Adjust debounce time as needed (optional)
      map((value) => {
        if (typeof value === 'string') {
          return this._filterProducts(value);
        }
        return [];
      })
    );
  }

  ngAfterViewInit(): void {
    if (this.input !== null) {
      this.input.nativeElement.focus();
    }
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  onSelectProduct(event: MatAutocompleteSelectedEvent) {
    const selectedProduct: GeneralItem | Product | null = event.option.value;
    this.isBundle = false;
    if (selectedProduct === null) {
      this.notification.show('Invalid Product Selected');
    } else {
      if (this.generalItemStore.isInstanceOfGeneralItem(selectedProduct)) {
        const item = this.generalItemStore.selectActualItem(selectedProduct);
        if (this.bundleService.isInstanceOfBundle(item)) {
          this.isBundle = true;
        }
      }
      this.productForm.rate = selectedProduct.rate;
    }
  }

  onSubmit() {
    if (
      this.productForm.item === null ||
      this.productForm.quantity <= 0 ||
      this.productForm.amount <= 0
    ) {
      return;
    }

    const actualItem: Product | Ledger | Bundle =
      this.generalItemStore.isInstanceOfGeneralItem(this.productForm.item)
        ? this.generalItemStore.selectActualItem(this.productForm.item)
        : this.productForm.item;

    try {
      this.store.createTransaction(
        actualItem,
        this.productForm.quantity,
        this.productForm.rate
      );
      this.productForm.reset();
    } catch (e) {
      this.notification.show('Error While Storing Transactions');
    } finally {
      this.input.nativeElement.focus();
    }
  }

  private _filterProducts(value: string): GeneralItem[] | Product[] {
    const filterValue = value.toLowerCase();
    if (value.length === 0) {
      return [];
    }

    if (this.store.kind === 'SALES') {
      return this.generalItemStore
        .getAsList()
        .filter((item) => item.title.toLowerCase().includes(filterValue));
    }
    return this.productService
      .getAsList()
      .filter((product) => product.title.toLowerCase().includes(filterValue));
  }

  displayFn(product: GeneralItem | Product | string | undefined): string {
    if (product === undefined || typeof product === 'string') {
      return '';
    }
    return product && product.title ? product.title : '';
  }

  // get hasTransactions(): Observable<boolean> {
  //   return this.store.invoice.pipe(
  //     map((value) => {
  //       return value.transactions.length >= 1;
  //     })
  //   );
  // }
}
