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
import {
  Observable,
  Subscription,
  map,
  startWith,
  debounceTime,
  EMPTY,
  take,
} from 'rxjs';
import { Product } from '../../../../../../interface/product.interface';
import { ProductService } from '../../../../../../services/product/product.service';
import { NotificationsService } from '../../../../../../services/notification/notification.service';
import { TransactionForm } from './TransactionForm';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-select-product',
  templateUrl: './select-product.component.html',
  styleUrls: ['./select-product.component.scss'],
})
export class SelectProductComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('firstInputField') input!: ElementRef<HTMLInputElement>;

  transactionForm = new TransactionForm();
  filteredProducts$: Observable<Product[]> = EMPTY;
  private _sub = new Subscription();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: InvoiceStoreService,
    private productService: ProductService,
    private notification: NotificationsService
  ) {}

  ngOnInit(): void {
    // Combine observable streams for product options
    this.filteredProducts$ = this.transactionForm.productFC.valueChanges.pipe(
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

  onProductSelected(event: MatAutocompleteSelectedEvent) {
    const product = event.option.value;
    this.transactionForm.patchValue({
      rate: product.rate,
    });
  }

  onSubmit() {
    if (this.transactionForm.invalid) {
      console.error(
        'Transaction Form Invalid data',
        this.transactionForm.value
      );
      return;
    }

    if (
      typeof this.transactionForm.product === 'string' ||
      this.transactionForm.product === null
    ) {
      console.error('Product is null or string');
      return;
    }

    console.log('Storing Values', this.transactionForm.value);

    this.store.createTransaction(
      this.transactionForm.product,
      this.transactionForm.quantity,
      this.transactionForm.rate
    );
    this.transactionForm.reset();
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

  private _filterProducts(value: string): Product[] {
    const filterValue = value.toLowerCase();
    if (value.length === 0) {
      return [];
    }

    return this.productService
      .getAsList()
      .filter((product) => product.title.toLowerCase().includes(filterValue));
  }

  displayFn(product: Product | string | undefined): string {
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
