import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  signal,
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
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-select-product',
  templateUrl: './select-product.component.html',
  styleUrls: ['./select-product.component.scss'],
  standalone: false,
})
export class SelectProductComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('firstInputField') input!: ElementRef<HTMLInputElement>;
  productForm = new TransactionForm();
  filteredProducts$: Observable<GeneralItem[] | Product[]> = EMPTY;
  recentProducts: (GeneralItem | Product)[] = [];
  private _sub = new Subscription();

  constructor(
    private store: InvoiceStoreService,
    private generalItemStore: GeneralItemStoreService,
    private productService: ProductService,
    private ledgerService: LedgerService,
    private notification: NotificationsService,
    private bundleService: BundleService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.generalItemStore.init();
    this.productService.init();
    this.ledgerService.init();

    //Checks Locally Stored Products
    const stored = localStorage.getItem(RECENT_PRODUCTS_KEY);
    if (stored) {
      try {
        this.recentProducts = JSON.parse(stored);
      } catch (e) {
        this.recentProducts = [];
      }
    }

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

  // Util to add product to recent list
  private addToRecentProducts(product: GeneralItem | Product) {
    // Remove if already present (by product id or title)
    this.recentProducts = this.recentProducts.filter(
      (p) =>
        p && (p['id'] ?? p['title']) !== (product['id'] ?? product['title'])
    );
    // Add to front
    this.recentProducts.unshift(product);
    // Cap to 4
    if (this.recentProducts.length > 4) {
      this.recentProducts = this.recentProducts.slice(0, 4);
    }
    // Optionally persist
    localStorage.setItem(
      RECENT_PRODUCTS_KEY,
      JSON.stringify(this.recentProducts)
    );
  }

  onSelectProduct(event: MatAutocompleteSelectedEvent) {
    const selectedProduct: GeneralItem | Product | null = event.option.value;
    if (selectedProduct === null) {
      this.notification.show('Invalid Product Selected');
      return;
    }

    if (this.generalItemStore.isInstanceOfGeneralItem(selectedProduct)) {
      const item = this.generalItemStore.selectActualItem(selectedProduct);
    }
    this.productForm.rate = selectedProduct.rate;
  }

  // Add a manual 'quick select' handler for the buttons
  onQuickSelect(product: GeneralItem | Product) {
    // Set form controls directly
    this.productForm.itemFormControl.setValue(product);
    this.productForm.rate = product.rate;
    this.input.nativeElement.focus();
  }

  onSubmit() {
    if (
      this.productForm.item === null ||
      this.productForm.quantity <= 0 ||
      this.productForm.amount <= 0 ||
      this.productForm.amount === null
    ) {
      if (this.store.netAmount() > 0) {
        this.router.navigate(['../set-discount'], { relativeTo: this.route });
      }

      return;
    }

    this.addToRecentProducts(this.productForm.item);

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

    if (this.store.kind() === 'SALES') {
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
}

// Add at the top
const RECENT_PRODUCTS_KEY = 'recent_products';
