import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, map } from 'rxjs';
import { Transaction } from './../../../../../interface/invoice.interface';
import { InvoiceStoreService } from '../../services/invoice-store.service';
import { LedgerService } from '../../../../../services/ledger/ledger.service';
import { ProductService } from '../../../../../services/product/product.service';
import { BundleService } from '../../../../../services/bundle/bundle.service';
import { Product } from '../../../../../interface/product.interface';
import { Bundle } from '../../../../../interface/bundle.interface';
import { Ledger } from '../../../../../interface/ledger.interface';
import { BaseService } from '../../../../../class/BaseService';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styles: [''],
})
export class TransactionsTableComponent implements OnInit, OnDestroy {
  public transactions: Transaction[] = [];
  public grossAmount = 0;
  public netAmount = 0;
  private sub: Subscription = new Subscription();

  constructor(
    private store: InvoiceStoreService,
    private ledgerService: LedgerService,
    private productService: ProductService,
    private bundleService: BundleService
  ) {}

  ngOnInit(): void {
    this.sub = this.store.invoice.subscribe({
      next: (invoice => {
        this.grossAmount = 0;
        this.netAmount = 0;
        this.transactions = invoice.transactions;
        invoice.transactions.forEach(t => {
          this.grossAmount += t.quantity * t.rate;
          this.netAmount += this.getRowAmount(t);
        });
      })
    })
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }

  deleteTransaction(index: number): void {
      this.store.deleteTransaction(index);
  }

  getDescription(transaction: Transaction) {
    console.log(transaction);
    if (transaction.itemType === 'LEDGER'){
      const title = this.ledgerService.getElementById(transaction.itemId).title;
      return `${title} Payment`;
    }

    let service = transaction.itemType === 'BUNDLE' ? this.bundleService : this.productService;
    const title = service.getElementById(transaction.itemId).title;
    return title;
  }

  getRowAmount(t: Transaction): number {
    return (t.quantity * t.rate) * (1 - t.discount / 100);
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

  get totalDiscount(): number {
    return this.grossAmount - this.netAmount;
  }
}
