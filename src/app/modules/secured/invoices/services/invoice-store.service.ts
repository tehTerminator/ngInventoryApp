import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Invoice } from '../../../../interface/invoice';
import { Transaction } from '../../../../interface/transaction';


@Injectable()
export class InvoiceStoreService {
  private invoiceData: BehaviorSubject<Invoice> =
    new BehaviorSubject<Invoice>({...EmptyInvoice});

  constructor() {}

  // Provide an observable for other components to subscribe to
  getInvoiceData() {
    return this.invoiceData.asObservable();
  }

  // Update the stored invoice data
  updateInvoiceData(data: Invoice) {
    this.invoiceData.next(data);
  }

  addTransaction(transaction: Transaction) {
    const transactionData = this.invoiceData.value.transactions;
    const indexOfSimilarTransaction = this.findSimilarTransaction(transactionData, transaction)
    if( indexOfSimilarTransaction > 0) {
      transactionData[indexOfSimilarTransaction].quantity += transaction.quantity;
      transactionData[indexOfSimilarTransaction].amount += transaction.amount;
    }
    else {
      transactionData.push(transaction);
    }

    this.invoiceData.next({... this.invoiceData.value, transactions: transactionData});

  }

  private findSimilarTransaction(data: Transaction[], transaction: Transaction): number{
    return data.findIndex(
      x => x.product_id === transaction.product_id && x.rate === transaction.rate
    )
  }

  set contact(id: number) {
    const currentInvoice = this.invoiceData.value;

    if (!!currentInvoice) {
        this.invoiceData.next({...currentInvoice, contactId: id});
    }
  }

  set kind(data: 'sales' | 'purchase') {
    const currentInvoice = this.invoiceData.value;
    if(!!currentInvoice) {
      this.invoiceData.next({...currentInvoice, kind: data})
    }
  }

  get kind(): 'sales' | 'purchase' {
    if (!!this.invoiceData.value) {
      return this.invoiceData.value.kind;
    }

    return 'sales';
  }
}

const EmptyInvoice: Invoice = {
  id: 0,
  kind: 'sales',
  contactId: 0,
  locationId: 0,
  paid: false,
  amount: 0,
  userId: 0,
  transactions: []
}
