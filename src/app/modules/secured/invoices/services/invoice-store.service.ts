import { computed, effect, Injectable, signal } from '@angular/core';
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
import { RecentPaymentMethodService } from '../create-invoice/services/recentPaymentMethods.service';

@Injectable({
  providedIn: 'root',
})
export class InvoiceStoreService {
  #invoice = signal(BASE_INVOICE);
  #paymentInfo = signal([] as Voucher[]);
  paymentInfo = computed(() => this.#paymentInfo());
  selectedItem: Product | Ledger | Bundle = EMPTY_PRODUCT;

  invoice = computed(() => this.#invoice());
  id = computed(() => this.#invoice().id);
  grossAmount = computed(() => {
    let amount = 0;
    this.#invoice().transactions.forEach((item) => amount += (item.quantity * item.rate));
    return amount;
  });
  netAmount = computed(() => {
    return this.grossAmount() - this.#invoice().discount_amount;
  });
  discountAmount = computed(() => {
    return this.#invoice().discount_amount;
  });
  paidAmount = computed(() => {
    let amount = 0;
    this.#paymentInfo().forEach((voucher) => amount += voucher.amount);
    return amount;
  });
  unpaidAmount = computed(() => {
    return this.netAmount() - this.paidAmount();
  });
  kind = computed(() => this.#invoice().kind);

  constructor(
    private ledgerService: LedgerService,
    private productService: ProductService,
    private bundleService: BundleService,
    private contactService: ContactsService,
  ) {
    effect(() => {
      if (
        this.netAmount() > 0 && 
        this.paidAmount() === this.netAmount() && 
        !this.#invoice().paid) 
      {
        this.#invoice.update((invoice) => ({...invoice, paid: true}));
      }
    });

    // Effect to automatically compute gross_amount when transactions are updated
    effect(() => {
      const transactions = this.#invoice().transactions;
      const grossAmount = transactions.reduce(
        (sum, item) => sum + item.quantity * item.rate,
        0
      );
    
      // Avoid infinite loop by checking if gross_amount has changed
      if (this.#invoice().gross_amount !== grossAmount) {
        this.#invoice.update((invoice) => ({
          ...invoice,
          gross_amount: grossAmount,
        }));
      }
    });
  }

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
        this.#invoice().contact_id
      );

      if (voucher.id > 0) {
        voucher.amount = amount;
        return;
      }
      if (this.#invoice().kind === 'SALES') {
        voucher.cr = contact.ledger_id;
        voucher.dr = dr;
      } else {
        voucher.dr = contact.ledger_id;
        voucher.cr = dr;
      }
      voucher.amount = amount;
    } finally {
      this.#paymentInfo.update((items) => [
        ...items,
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

  setKind(data: 'SALES' | 'PURCHASE' | 'sales' | 'purchase') {
    const kind = data.toUpperCase() === 'SALES' ? 'SALES' : 'PURCHASE';
    this.#invoice.update(value => ({ ...value, kind }));
  }

  setLocation(location_id: number) {
    this.#invoice.update(value => ({ ...value, location_id }));
  }

  setDiscount(discount: number) {
    const grossAmount = this.#invoice().gross_amount;
    if (discount / grossAmount >= 0.5) {
      this.#invoice.update(value => ({ ...value, discount_amount: grossAmount * 0.49 }));
    } else {
      this.#invoice.update(value => ({ ...value, discount_amount: discount }));
    }
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

  setId(id: number) {
    this.#invoice.update(value => ({...value, id}));
  }

  setUser(id: number) {
    this.#invoice.update(value=> ({...value, user_id: id}));
  }
}
