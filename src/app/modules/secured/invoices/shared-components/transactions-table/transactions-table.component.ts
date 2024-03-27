import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  map,
} from 'rxjs';
import { Transaction } from './../../../../../interface/invoice.interface';
import { InvoiceStoreService } from '../../services/invoice-store.service';
import { LedgerService } from '../../../../../services/ledger/ledger.service';
import { ProductService } from '../../../../../services/product/product.service';
import { BundleService } from '../../../../../services/bundle/bundle.service';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
})
export class TransactionsTableComponent implements OnInit, OnDestroy {
  private finally = new BehaviorSubject(1);

  constructor(
    public store: InvoiceStoreService,
    private ledgerService: LedgerService,
    private productService: ProductService,
    private bundleService: BundleService
  ) {
    this.ledgerService.init();
    this.productService.init();
    this.bundleService.init();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.finally.next(1);
    this.finally.complete();
  }

  deleteTransaction = (transaction: Transaction) =>
    this.store.deleteTransaction(transaction);

  getDescription(transaction: Transaction) {
    if (transaction.itemType === 'LEDGER') {
      const title = this.ledgerService.getElementById(transaction.itemId).title;
      return `${title} Payment`;
    }

    let service =
      transaction.itemType === 'BUNDLE'
        ? this.bundleService
        : this.productService;
    const title = service.getElementById(transaction.itemId).title;
    return title;
  }

  getRowAmount(t: Transaction): number {
    return t.quantity * t.rate * (1 - t.discount / 100);
  }

  showButtons(): boolean {
    return this.store.snapshot.id === 0;
  }

  get colspan(): number {
    if (this.showButtons()) {
      return 5;
    }
    return 4;
  }

  get transactions$(): Observable<Transaction[]> {
    return this.store.invoice.pipe(map((value) => value.transactions));
  }
}
