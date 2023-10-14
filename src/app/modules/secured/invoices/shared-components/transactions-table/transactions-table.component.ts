import { Component, OnDestroy, OnInit, } from '@angular/core';
import { Subscription } from 'rxjs';
// import { InvoiceStoreService } from '../../services/invoice-store.service.ts';
import { Transaction } from './../../../../../interface/transaction';

@Component({
    selector: 'app-transactions-table',
    templateUrl: './transactions-table.component.html',
    styles: ['']
})
// export class TransactionsTableComponent implements OnInit, OnDestroy {
export class TransactionsTableComponent {
    // public transactions: Transaction[] = [];
    // private sub: Subscription = new Subscription();

    // constructor(private store: InvoiceStoreService) { }

    // ngOnInit(): void {
    //     this.sub = this.store.invoice.subscribe(
    //         (invoice => this.transactions = invoice.transactions)
    //     );
    // }

    // ngOnDestroy(): void {
    //     this.sub.unsubscribe();
    // }

    // deleteTransaction(index: number): void {
    //     this.store.deleteTransaction(index);
    // }

    // get grossAmount(): number {
    //     let total = 0;
    //     for (const t of this.transactions) {
    //         total += t.amount;
    //     }
    //     return total;
    // }

    // get colspan(): number {
    //     if (this.showButtons()) {
    //         return 5;
    //     }
    //     return 4;
    // }

    // get emptyRows(): number[] {
    //     const tCount = this.transactions.length;
    //     if (tCount >= 5)
    //     {
    //         return [];
    //     }
    //     else{
    //         return Array.from(Array(5 - tCount).keys());
    //     }
    // }


    // showButtons(): boolean {
    //     return this.store.invoice.value.id === 0;
    // }

}
