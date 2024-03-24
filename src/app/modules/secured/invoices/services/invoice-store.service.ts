import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import {
  Transaction,
  Invoice,
  BASE_INVOICE,
  BASE_TRANSACTION,
} from '../../../../interface/invoice.interface';
import { Contact } from '../../../../interface/contact.interface';
import {
  Product,
  EMPTY_PRODUCT,
} from '../../../../interface/product.interface';
import { Ledger } from '../../../../interface/ledger.interface';
import { Bundle } from '../../../../interface/bundle.interface';
import { LedgerService } from '../../../../services/ledger/ledger.service';
import { ProductService } from '../../../../services/product/product.service';
import { BundleService } from '../../../../services/bundle/bundle.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceStoreService {
  selectedItem: Product | Ledger | Bundle = EMPTY_PRODUCT;
  private _invoiceData: BehaviorSubject<Invoice> = new BehaviorSubject<Invoice>(
    BASE_INVOICE
  );

  constructor(
    private ledgerService: LedgerService,
    private productService: ProductService,
    private bundleService: BundleService
  ) {}

  get invoice(): Observable<Invoice> {
    return this._invoiceData;
  }

  set invoice(data: Invoice) {
    this._invoiceData.next(data);
  }

  createTransaction(quantity: number, rate: number, discount = 0): void {
    let transaction = { ...BASE_TRANSACTION };
    if (this.bundleService.isInstanceOfBundle(this.selectedItem)) {
      transaction = this.createTransactionFromBundle(
        this.selectedItem,
        quantity
      );
    } else {
      const kind = this.ledgerService.isInstanceOfLedger(this.selectedItem)
        ? 'LEDGER'
        : 'PRODUCT';

      transaction = this.makeTransation(
        this.selectedItem,
        kind,
        quantity,
        rate,
        discount
      );
    }
    this.appendTransaction(transaction);
  }

  /**
   * 
   * @param item is Product | Bundle | Ledger
   * @param kind is a String "PRODUCT" | "LEDGER" | "BUNDLE"
   * @param quantity is a number
   * @param rate is a number
   * @param discount is a number
   * @returns a Transaction
   */
  private makeTransation(
    item: Product | Ledger | Bundle,
    kind: 'PRODUCT' | 'LEDGER' | 'BUNDLE',
    quantity: number,
    rate: number,
    discount = 0
  ) {
    let transaction = { ...BASE_TRANSACTION };
    transaction.itemId = item.id; 
    transaction.rate = rate;
    transaction.discount = kind === 'PRODUCT' ? discount : 0;
    transaction.itemType = kind;
    transaction.quantity = quantity;
    return transaction;
  }

  appendTransaction(newTransaction: Transaction) {
    const existingTransactions = this._invoiceData.value.transactions;
    const indexOfSimilarTransaction =
      this.findSimilarTransaction(newTransaction);
    if (indexOfSimilarTransaction > 0) {
      existingTransactions[indexOfSimilarTransaction].quantity +=
        newTransaction.quantity;
    } else {
      existingTransactions.push(newTransaction);
    }

    this.invoice = {
      ...this._invoiceData.value,
      transactions: existingTransactions,
    };
  }

  deleteTransaction(index: number) {
    const existingTransactions = { ...this.snapshot.transactions };
    existingTransactions.splice(index, 1);
    this._invoiceData.next({
      ...this.snapshot,
      transactions: existingTransactions,
    });
  }

  private findSimilarTransaction(transaction: Transaction): number {
    const data = this.snapshot.transactions;
    return data.findIndex(
      (x) => x.id === transaction.id && x.rate === transaction.rate
    );
  }

  private createTransactionFromBundle(
    bundle: Bundle,
    quantity: number
  ): Transaction {
    const rate = this.bundleService.getElementById(bundle.id).rate;
    const transaction = this.makeTransation(bundle, 'BUNDLE', quantity, rate);
    transaction.transactions = [];
    for (const template of bundle.templates) {
      try {
        let item =
          template.kind === 'PRODUCT'
            ? this.productService.getElementById(template.item_id)
            : this.ledgerService.getElementById(template.item_id);
        quantity = template.quantity * quantity;
        transaction.transactions.push(
          this.makeTransation(item, template.kind, quantity, template.rate)
        );
      } catch (e) {
        throw new Error('Unable to Create Transaction for ' + JSON.stringify(template));
      }
    }
    return transaction;
  }

  reset(): void {
    this._invoiceData.next(BASE_INVOICE);
  }

  set contact(contact: Contact) {
    const oldInvoiceValue = this.snapshot;
    this._invoiceData.next({
      ...oldInvoiceValue,
      contact_id: contact.id,
    });
  }

  set kind(data: 'SALES' | 'PURCHASE') {
    const currentInvoice = this._invoiceData.value;
    if (!!currentInvoice) {
      this.invoice = { ...currentInvoice, kind: data };
    }
  }

  get kind(): 'SALES' | 'PURCHASE' {
    if (!!this._invoiceData.value) {
      return this._invoiceData.value.kind;
    }

    return 'SALES';
  }

  get snapshot(): Invoice {
    return this._invoiceData.value;
  }

  set amount(value: number) {
    this._invoiceData.next({ ...this.snapshot, amount: value });
  }

  set location(value: number) {
    this._invoiceData.next({ ...this.snapshot, location_id: value });
  }
}
