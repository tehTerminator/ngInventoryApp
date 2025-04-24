import { computed, Injectable, signal } from '@angular/core';
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
  #invoice = signal(BASE_INVOICE);
  selectedItem: Product | Ledger | Bundle = EMPTY_PRODUCT;
  #paymentInfo = signal([] as Voucher[]);

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
    const existingTransactions = this.#invoice().transactions;
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

    this.#invoice.update((value) => {
      return {
        ...value,
        gross_amount: grossAmount,
        transactions: existingTransactions,
      };
    });
  }

  deleteTransaction(transaction: Transaction) {
    const existingTransactions = this.#invoice().transactions;
    const indexOfTransaction = existingTransactions.findIndex(
      (x) => x === transaction
    );
    existingTransactions.splice(indexOfTransaction, 1);
    this.#invoice.update((invoice) => {
      return {
        ...invoice,
        transactions: existingTransactions,
      };
    });
  }

  private findSimilarTransaction(transaction: Transaction): number {
    const data = this.#invoice().transactions;
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
      this.#paymentInfo.update((paymentInfo) => [
        ...this.#paymentInfo(),
        voucher,
      ]);
    }
  }

  removePaymentMethod(voucher: Voucher) {
    let oldPaymentInfo = this.#paymentInfo();
    const index = oldPaymentInfo.findIndex((item) => item === voucher);

    if (index >= 0) {
      oldPaymentInfo.splice(index, 1);
      this.#paymentInfo.set(oldPaymentInfo);
    } else {
      console.warn('Voucher not found in paymentInfo$', voucher);
    }
  }

  reset(): void {
    this.#invoice.set({ ...BASE_INVOICE, transactions: [] });
    this.resetPayment();
    this.ledgerService.init();
    this.productService.init();
    this.bundleService.init();
    this.contactService.init();
  }

  resetPayment(): void {
    this.#paymentInfo.set([]);
  }

  set contact(id: number) {
    this.#invoice.update((value) => {
      return {
        ...value,
        contact_id: id,
      };
    });
  }

  set kind(data: 'SALES' | 'PURCHASE' | 'sales' | 'purchase') {
    const kind = data.toUpperCase() === 'SALES' ? 'SALES' : 'PURCHASE';
    const currentInvoice = this.snapshot;
    if (!!currentInvoice) {
      this.#invoice.update(value => ({ ...value, kind }));
    }
  }

  get kind(): 'SALES' | 'PURCHASE' {
    if (!!this.#invoice()) {
      return this.#invoice().kind;
    }
    return 'SALES';
  }

  set amount(gross_amount: number) {
    this.#invoice.update(value => ({ ...value, gross_amount }));
  }

  set location(location_id: number) {
    this.#invoice.update(value => ({ ...value, location_id }));
  }

  set discount(discount: number) {
    const grossAmount = this.#invoice().gross_amount;
    if (discount / grossAmount >= 0.5) {
      this.#invoice.update(value => ({ ...value, discount_amount: grossAmount * 0.49 }));
    } else {
      this.#invoice.update(value => ({ ...value, discount_amount: discount }));
    }
  }

  get discount(): number {
    return this.#invoice().discount_amount;
  }

  get grossAmount() {
    let grossAmount = 0;
    this.#invoice().transactions.forEach((t) => {
      grossAmount += t.quantity * t.rate;
    });
    return grossAmount;
  }

  get netAmount() {
    return this.#invoice().gross_amount - this.#invoice().discount_amount;
  }

  get paidAmount() {
      let amount = 0;
      this.#paymentInfo().forEach((v) => (amount += v.amount));
      return amount;
  }

  setInvoice(data: { invoice: Invoice; vouchers: Voucher[] }) {
    const invoiceData = { ...data.invoice };
    invoiceData.transactions = [];
    this.#invoice.set(invoiceData);
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

    this.#paymentInfo.set(data.vouchers);
  }

  set id(id: number) {
    this.#invoice.update(value => ({...value, id}));
  }

  get id(): number {
    return this.#invoice().id;
  }
}
