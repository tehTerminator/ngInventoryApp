import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Bundle } from '../../../../interface/bundle.interface';
import { BundleService } from '../../../../services/bundle/bundle.service';
import { Ledger } from '../../../../interface/ledger.interface';
import { LedgerService } from '../../../../services/ledger/ledger.service';
import { ProductService } from '../../../../services/product/product.service';
import {
  BASE_INVOICE,
  BASE_TRANSACTION,
  Invoice,
  Transaction,
} from '../../../../interface/invoice.interface';
import {
  Product,
  EMPTY_PRODUCT,
} from '../../../../interface/product.interface';
import {
  EMPTY_VOUCHER,
  Voucher,
} from '../../../../interface/voucher.interface';
import { ContactsService } from './contacts.service';

@Injectable({
  providedIn: 'root',
})
export class InvoiceStoreService {
  selectedItem: Product | Ledger | Bundle = {
    id: 3,
    title: 'Job Work',
    rate: 100,
  };
  private _invoiceData = new BehaviorSubject<Invoice>(BASE_INVOICE);
  paymentInfo$ = new BehaviorSubject<Voucher[]>([]);

  constructor(
    private ledgerService: LedgerService,
    private productService: ProductService,
    private bundleService: BundleService,
    private contactsService: ContactsService
  ) {
    this.createTransaction(1, 100, 0);
  }

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
        throw new Error(
          'Unable to Create Transaction for ' + JSON.stringify(template)
        );
      }
    }
    return transaction;
  }

  addPaymentMethod(dr: number, amount: number) {
    const voucher: Voucher = { ...EMPTY_VOUCHER };
    voucher.dr = dr;
    voucher.amount = amount;
    console.log('addPaymentMethod called', voucher);
    this.paymentInfo$.next([...this.paymentInfo$.value, voucher]);
  }

  removePaymentMethod(voucher: Voucher) {
    let oldPaymentInfo = this.paymentInfo$.value;
    const index = oldPaymentInfo.findIndex((item) => item === voucher);

    if (index >= 0) {
      oldPaymentInfo.splice(index, 1);
      this.paymentInfo$.next(oldPaymentInfo);
    } else {
      console.warn('Voucher not found in paymentInfo$', voucher);
    }
  }

  reset(): void {
    this._invoiceData.next(BASE_INVOICE);
  }

  set contact(id: number) {
    const oldInvoiceValue = this.snapshot;
    this._invoiceData.next({
      ...oldInvoiceValue,
      contact_id: id,
    });
  }

  set kind(data: 'SALES' | 'PURCHASE' | 'sales' | 'purchase') {
    const kind = data.toUpperCase() === 'SALES' ? 'SALES' : 'PURCHASE';
    const currentInvoice = this._invoiceData.value;
    if (!!currentInvoice) {
      this.invoice = { ...currentInvoice, kind: kind };
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

  get grossAmount() {
    return this.invoice.pipe(
      map((invoice) => {
        let grossAmount = 0;
        invoice.transactions.forEach((t) => {
          grossAmount += t.quantity * t.rate;
        });
        return grossAmount;
      })
    );
  }

  get netAmount() {
    return this.invoice.pipe(
      map((invoice) => {
        let amount = 0;
        invoice.transactions.forEach(
          (t) => (amount += t.quantity * t.rate * (1 - t.discount / 100))
        );
        return amount;
      })
    );
  }

  get paidAmount() {
    return this.paymentInfo$.pipe(
      map((vouchers) => {
        let amount = 0;
        vouchers.forEach((v) => (amount += v.amount));
        return amount;
      })
    );
  }

  get netDiscount() {
    return this.invoice.pipe(
      map((invoice) => {
        let amount = 0;
        invoice.transactions.forEach(
          (t) => (amount += t.quantity * t.rate * (t.discount / 100))
        );
        return amount;
      })
    );
  }
}
