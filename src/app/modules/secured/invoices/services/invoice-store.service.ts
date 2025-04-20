import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Bundle } from '../../../../interface/bundle.interface';
import { BundleService } from '../../../../services/bundle/bundle.service';
import { Ledger } from '../../../../interface/ledger.interface';
import { LedgerService } from '../../../../services/ledger/ledger.service';
import { ProductService } from '../../../../services/product/product.service';
import { ContactsService } from '../../../../services/contacts/contacts.service';
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

@Injectable({
  providedIn: 'root',
})
export class InvoiceStoreService {
  private _invoice = new BehaviorSubject<Invoice>(BASE_INVOICE);
  selectedItem: Product | Ledger | Bundle = EMPTY_PRODUCT;
  paymentInfo$ = new BehaviorSubject<Voucher[]>([]);

  constructor(
    private ledgerService: LedgerService,
    private productService: ProductService,
    private bundleService: BundleService,
    private contactService: ContactsService
  ) {}

  createTransaction(
    item: Product | Bundle | Ledger,
    quantity: number,
    rate: number
  ): void {
    let transaction = { ...BASE_TRANSACTION };
    if (this.bundleService.isInstanceOfBundle(item)) {
      transaction = this.createTransactionFromBundle(item, +quantity);
    } else {
      const kind = this.ledgerService.isInstanceOfLedger(item)
        ? 'LEDGER'
        : 'PRODUCT';

      transaction = this.makeTransation(item, kind, +quantity, +rate);
    }
    this.appendTransaction(transaction);
  }

  /**
   *
   * @param item is Product | Bundle | Ledger
   * @param kind is a String "PRODUCT" | "LEDGER" | "BUNDLE"
   * @param quantity is a number
   * @param rate is a number
   * @returns a Transaction
   */
  private makeTransation(
    item: Product | Ledger | Bundle,
    kind: 'PRODUCT' | 'LEDGER' | 'BUNDLE',
    quantity: number,
    rate: number
  ) {
    let transaction = {
      ...BASE_TRANSACTION,
      rate: +rate,
      quantity: +quantity,
      item_id: +item.id,
      item_type: kind,
    };
    return transaction;
  }

  private appendTransaction(newTransaction: Transaction) {
    const existingTransactions = this.snapshot.transactions;
    const indexOfSimilarTransaction =
      this.findSimilarTransaction(newTransaction);
    if (indexOfSimilarTransaction >= 0) {
      existingTransactions[indexOfSimilarTransaction].quantity +=
        newTransaction.quantity;
    } else {
      existingTransactions.push(newTransaction);
    }

    let grossAmount = 0;
    existingTransactions.forEach(
      (item) => (grossAmount += item.quantity * item.rate)
    );

    this._invoice.next({
      ...this.snapshot,
      gross_amount: grossAmount,
      transactions: existingTransactions,
    });
  }

  deleteTransaction(transaction: Transaction) {
    const existingTransactions = this.snapshot.transactions;
    const indexOfTransaction = existingTransactions.findIndex(
      (x) => x === transaction
    );
    existingTransactions.splice(indexOfTransaction, 1);
    this._invoice.next({
      ...this.snapshot,
      transactions: existingTransactions,
    });
  }

  private findSimilarTransaction(transaction: Transaction): number {
    const data = this.snapshot.transactions;
    return data.findIndex(
      (x) =>
        x.rate === transaction.rate &&
        x.item_type === transaction.item_type &&
        x.item_id === transaction.item_id
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
        const newQuantity = template.quantity * quantity;
        transaction.transactions.push(
          this.makeTransation(item, template.kind, newQuantity, template.rate)
        );
      } catch (e) {
        throw new Error(
          'Unable to Create Transaction for ' + JSON.stringify(template)
        );
      }
    }
    return transaction;
  }

  addPaymentMethod(dr: number, amount: number, voucher = { ...EMPTY_VOUCHER }) {
    try {
      const contact = this.contactService.getElementById(
        this.snapshot.contact_id
      );
      if (voucher.id > 0) {
        voucher.amount = amount;
        return;
      }
      if (this.snapshot.kind === 'SALES') {
        voucher.cr = contact.ledger_id;
        voucher.dr = dr;
      } else {
        voucher.dr = contact.ledger_id;
        voucher.cr = dr;
      }
      voucher.amount = amount;
    } finally {
      this.paymentInfo$.next([...this.paymentInfo$.value, voucher]);
    }
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
    this._invoice.next({ ...BASE_INVOICE, transactions: [] });
    this.resetPayment();
    this.ledgerService.init();
    this.productService.init();
    this.bundleService.init();
    this.contactService.init();
  }

  resetPayment(): void {
    this.paymentInfo$.next([]);
  }

  set contact(id: number) {
    const oldInvoiceValue = this.snapshot;
    this._invoice.next({
      ...oldInvoiceValue,
      contact_id: id,
    });
  }

  set kind(data: 'SALES' | 'PURCHASE' | 'sales' | 'purchase') {
    const kind = data.toUpperCase() === 'SALES' ? 'SALES' : 'PURCHASE';
    const currentInvoice = this.snapshot;
    if (!!currentInvoice) {
      this._invoice.next({ ...currentInvoice, kind: kind });
    }
  }

  get kind(): 'SALES' | 'PURCHASE' {
    if (!!this._invoice.value) {
      return this._invoice.value.kind;
    }
    return 'SALES';
  }

  get snapshot(): Invoice {
    return this._invoice.value;
  }

  get vouchers(): Voucher[] {
    return this.paymentInfo$.value;
  }

  set amount(value: number) {
    this._invoice.next({ ...this.snapshot, gross_amount: value });
  }

  set location(value: number) {
    this._invoice.next({ ...this.snapshot, location_id: value });
  }

  set discount(value: number) {
    const oldData = this.snapshot;
    const grossAmount = oldData.gross_amount;
    if (value / grossAmount >= 0.5) {
      this._invoice.next({ ...oldData, discount_amount: grossAmount * 0.49 });
    } else {
      this._invoice.next({ ...oldData, discount_amount: value });
    }
  }

  get discount(): number {
    return this.snapshot.discount_amount;
  }

  get grossAmount() {
    return this._invoice.pipe(
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
    return this._invoice.pipe(
      map((invoice) => {
        const netAmount = invoice.gross_amount - invoice.discount_amount;
        return netAmount;
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
    return this._invoice.pipe(
      map((invoice) => {
        const dis = invoice.discount_amount;
        return dis;
      })
    );
  }

  get invoice(): Observable<Invoice> {
    return this._invoice;
  }

  set invoice(data: { invoice: Invoice; vouchers: Voucher[] }) {
    const invoiceData = { ...data.invoice };
    invoiceData.transactions = [];
    this._invoice.next(invoiceData);
    data.invoice.transactions.forEach((item) => {
      let service: ProductService | LedgerService | BundleService =
        this.productService;
      switch (item.item_type) {
        case 'BUNDLE':
          service = this.bundleService;
          break;
        case 'LEDGER':
          service = this.ledgerService;
          break;
        case 'PRODUCT':
          service = this.productService;
          break;
      }
      const selectedItem: Product | Ledger | Bundle = service.getElementById(
        item.item_id
      );
      this.createTransaction(selectedItem, item.quantity, item.rate);
    });

    this.paymentInfo$.next(data.vouchers);
  }

  set id(id: number) {
    const oldData = this.snapshot;
    oldData.id = id;
    this._invoice.next(oldData);
  }

  get id(): number {
    return this.snapshot.id;
  }
}
