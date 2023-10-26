import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Invoice } from '../../../../interface/invoice';
import { Transaction } from '../../../../interface/transaction';
import { Contact } from '../../../../interface/contact';
import { Product } from '../../../../interface/product';


@Injectable()
export class InvoiceStoreService {
  product = new BehaviorSubject<Product|null>(null);
  private _invoiceData: BehaviorSubject<Invoice> =
    new BehaviorSubject<Invoice>({...EmptyInvoice});

  constructor() {}


  get invoice(): Observable<Invoice> {
    return this._invoiceData;
  }

  set invoice(data: Invoice) {
    this._invoiceData.next(data);
  }

  addTransaction(transaction: Transaction) {
    const transactionData = this._invoiceData.value.transactions;
    const indexOfSimilarTransaction = this.findSimilarTransaction(transactionData, transaction)
    if( indexOfSimilarTransaction > 0) {
      transactionData[indexOfSimilarTransaction].quantity += transaction.quantity;
      transactionData[indexOfSimilarTransaction].amount += transaction.amount;
    }
    else {
      transactionData.push(transaction);
    }

    this.invoice = {... this._invoiceData.value, transactions: transactionData};
    console.log(this._invoiceData.value);
  }

  deleteTransaction(index: number) {
    const transactions = {... this.snapshot.transactions};
    transactions.splice(index, 1);
    this._invoiceData.next({...this.snapshot, transactions});
  }

  private findSimilarTransaction(data: Transaction[], transaction: Transaction): number{
    return data.findIndex(
      x => x.product_id === transaction.product_id && x.rate === transaction.rate
    )
  }

  reset(): void {
    this._invoiceData.next(EmptyInvoice);
  }

  set contact(contact: Contact) {
    const currentValue = this._invoiceData.value;
    this._invoiceData.next({...currentValue, contact, contact_id: contact.id});
  }

  set kind(data: 'sales' | 'purchase') {
    const currentInvoice = this._invoiceData.value;
    if(!!currentInvoice) {
      this.invoice = {...currentInvoice, kind: data};
    }
  }

  get kind(): 'sales' | 'purchase' {
    if (!!this._invoiceData.value) {
      return this._invoiceData.value.kind;
    }

    return 'sales';
  }

  get snapshot(): Invoice {
    return this._invoiceData.value;
  }

  set amount(value: number) {
    this._invoiceData.next({...this.snapshot, amount: value});
  }

  set location(value: number) {
    this._invoiceData.next({...this.snapshot, location_id: value});
  }
}

const EmptyInvoice: Invoice = {
  id: 0,
  kind: 'sales',
  contact_id: 0,
  contact: {
    id: 0,
    title: 'Not Selected',
    address: 'Not Selected',
    mobile: '',
    kind: 'CUSTOMER',
  },
  location_id: 0,
  paid: false,
  amount: 0,
  userId: 0,
  transactions: [],
  created_at: ''
}
