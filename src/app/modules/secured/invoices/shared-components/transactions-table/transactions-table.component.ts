import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, map, takeUntil } from 'rxjs';
import { Transaction } from './../../../../../interface/invoice.interface';
import { InvoiceStoreService } from '../../services/invoice-store.service';
import { LedgerService } from '../../../../../services/ledger/ledger.service';
import { ProductService } from '../../../../../services/product/product.service';
import { BundleService } from '../../../../../services/bundle/bundle.service';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
})
export class TransactionsTableComponent {
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

  deleteTransaction = (transaction: Transaction) =>
    this.store.deleteTransaction(transaction);

  getDescription(transaction: Transaction) {
    if (transaction.item_type === 'LEDGER') {
      const title = this.ledgerService.getElementById(
        transaction.item_id
      ).title;
      return `${title} Payment`;
    }

    let service =
      transaction.item_type === 'BUNDLE'
        ? this.bundleService
        : this.productService;
    const title = service.getElementById(transaction.item_id).title;
    return title;
  }

  showButtons(): boolean {
    return this.store.snapshot.id === 0;
  }

  get colspan(): number {
    if (this.showButtons()) {
      return 4;
    }
    return 3;
  }

  get transactions$() {
    return this.store.invoice.pipe(map((value) => value.transactions));
  }
}
