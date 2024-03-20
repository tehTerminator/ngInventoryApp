import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, map } from 'rxjs';
import { Transaction } from './../../../../../interface/invoice.interface';
import { InvoiceStoreService } from '../../services/invoice-store.service';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styles: [''],
})
export class TransactionsTableComponent {
  // export class TransactionsTableComponent {
  public transactions: Transaction[] = [];
  private sub: Subscription = new Subscription();

  constructor(private store: InvoiceStoreService) {}

  // ngOnInit(): void {
  //     this.sub = this.store.invoice.subscribe(
  //         (invoice => this.transactions = invoice.transactions)
  //     );
  // }

  // ngOnDestroy(): void {
  //     this.sub.unsubscribe();
  // }

  deleteTransaction(index: number): void {
      this.store.deleteTransaction(index);
  }

  get transactions$(): Observable<Transaction[]> {
    return this.store.invoice.pipe(map((value) => value.transactions));
  }

  get grossAmount(): Observable<number> {
    return this.store.invoice.pipe(map((value) => {
        let total = 0;
        value.transactions.forEach(item => {
            total += item.amount;
        })
        return total;
    }))
  }

  get colspan(): number {
    if (this.showButtons()) {
      return 5;
    }
    return 4;
  }

//   get emptyRows(): number[] {
//     const tCount = this.transactions.length;
//     if (tCount >= 5) {
//       return [];
//     } else {
//       return Array.from(Array(5 - tCount).keys());
//     }
//   }

  showButtons(): boolean {
    return this.store.snapshot.id === 0;
  }
}
