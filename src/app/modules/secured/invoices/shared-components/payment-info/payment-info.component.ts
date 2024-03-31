import { Component, OnDestroy, OnInit } from '@angular/core';
import { InvoiceStoreService } from '../../services/invoice-store.service';
import { LedgerService } from '../../../../../services/ledger/ledger.service';
import { Subject, debounce, debounceTime, map, takeUntil } from 'rxjs';
import { Voucher } from '../../../../../interface/voucher.interface';

@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.scss'],
})
export class PaymentInfoComponent implements OnDestroy, OnInit {
  // Declare dependencies
  invoiceAmount = 0;
  paymentAmount = 0;
  kind = 'SALES';
  private _notifier$ = new Subject();

  constructor(
    public store: InvoiceStoreService,
    private ledgerService: LedgerService
  ) {}

  // Initialize services (logically separate from constructor for clarity)
  ngOnInit() {
    this.ledgerService.init();
    this.store.netAmount
      .pipe(takeUntil(this._notifier$), debounceTime(500))
      .subscribe({ next: (value) => (this.invoiceAmount = value) });
    this.store.paidAmount
      .pipe(takeUntil(this._notifier$), debounceTime(300))
      .subscribe({ next: (value) => (this.paymentAmount = value) });
    this.store.invoice
      .pipe(takeUntil(this._notifier$), debounceTime(300))
      .subscribe({ next: (value) => (this.kind = value.kind) });
  }

  ngOnDestroy(): void {
    this._notifier$.next(null);
    this._notifier$.complete();
  }

  // Define component methods
  getTitle(id: number) {
    return this.ledgerService.getElementById(id).title;
  }

  removeVoucher(voucher: Voucher) {
    this.store.removePaymentMethod(voucher);
  }

  get paymentStatus(): string {
    if (this.paymentAmount === 0) {
      return 'Unpaid';
    }

    if (this.paymentAmount >= this.invoiceAmount) {
      return 'Fully Paid';
    }

    return 'Partially Paid';
  }
}
