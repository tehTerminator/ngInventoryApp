import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Invoice } from '../../../../interface/invoice';
import { Transaction } from '../../../../interface/transaction';
import { Contact } from '../../../../interface/contact';


@Injectable()
export class InvoiceStoreService {
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

  }

  private findSimilarTransaction(data: Transaction[], transaction: Transaction): number{
    return data.findIndex(
      x => x.product_id === transaction.product_id && x.rate === transaction.rate
    )
  }

  set contact(contact: Contact) {
    const currentValue = this._invoiceData.value;
    this._invoiceData.next({...currentValue, contact, contactId: contact.id});
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
}

const EmptyInvoice: Invoice = {
  id: 0,
  kind: 'sales',
  contactId: 0,
  contact: {
    id: 0,
    title: 'Not Selected',
    address: 'Not Selected',
    mobile: '',
    kind: 'CUSTOMER',
  },
  locationId: 0,
  paid: false,
  amount: 0,
  userId: 0,
  transactions: []
}
