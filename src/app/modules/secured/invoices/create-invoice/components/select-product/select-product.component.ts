import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { InvoiceStoreService } from '../../../services/invoice-store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import {
  Observable,
  Subscription,
  map,
  startWith,
  debounceTime,
  EMPTY,
  take,
} from 'rxjs';
import { GeneralItem } from '../../../../../../interface/general-item.interface';
import { GeneralItemStoreService } from '../../services/general-item-store.service';
import { Product } from '../../../../../../interface/product.interface';
import { ProductService } from '../../../../../../services/product/product.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { NotificationsService } from '../../../../../../services/notification/notification.service';
import { LedgerService } from '../../../../../../services/ledger/ledger.service';

@Component({
  selector: 'app-select-product',
  templateUrl: './select-product.component.html',
  styleUrls: ['./select-product.component.scss'],
})
export class SelectProductComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('firstInputField') input!: ElementRef<HTMLInputElement>;

  productControl = new FormControl<GeneralItem | Product | ''>('', {
    nonNullable: true,
  });
  productForm = new FormGroup({ product: this.productControl });
  filteredProducts$: Observable<GeneralItem[] | Product[]> = EMPTY;
  private _sub = new Subscription();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: InvoiceStoreService,
    private generalItemStore: GeneralItemStoreService,
    private productService: ProductService,
    private ledgerService: LedgerService,
    private notification: NotificationsService
  ) {}

  ngOnInit(): void {
    this.generalItemStore.init();
    this.productService.init();
    this.ledgerService.init();

    // Combine observable streams for product options
    this.filteredProducts$ = this.productControl.valueChanges.pipe(
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
    if (selectedProduct === null) {
      this.notification.show('Invalid Product Selected');
    } else if (this.generalItemStore.isInstanceOfGeneralItem(selectedProduct)) {
      this.store.selectedItem =
        this.generalItemStore.selectActualItem(selectedProduct);
    } else {
      this.store.selectedItem = selectedProduct;
    }
  }

  navigateToCreateTransactions() {
    this.router.navigate(['../create-transactions'], {
      relativeTo: this.route,
    });
  }

  navigateToPaymentOption() {
    this.store.invoice.pipe(take(1)).subscribe({
      next: (value) => {
        if (value.kind === 'PURCHASE') {
          this.router.navigate(['../choose-payment-method'], {
            relativeTo: this.route,
          });
        } else {
          this.router.navigate(['../set-discount'], {
            relativeTo: this.route,
          });
        }
      },
    });
  }

  private _filterProducts(value: string): GeneralItem[] | Product[] {
    const filterValue = value.toLowerCase();
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

  get hasTransactions(): Observable<boolean> {
    return this.store.invoice.pipe(
      map((value) => {
        return value.transactions.length >= 1;
      })
    );
  }
}
