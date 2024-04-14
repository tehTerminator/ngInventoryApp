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
export class TransactionsTableComponent implements OnInit {
  constructor(
    public store: InvoiceStoreService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productService.init();
  }

  deleteTransaction = (transaction: Transaction) =>
    this.store.deleteTransaction(transaction);

  getDescription(id: number) {
    return this.productService.getElementById(id).title;
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
