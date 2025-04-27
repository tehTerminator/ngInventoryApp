import { Component, OnDestroy, OnInit } from '@angular/core';
import { InvoiceStoreService } from '../../services/invoice-store.service';
import { LedgerService } from '../../../../../services/ledger/ledger.service';
import { Subject, debounce, debounceTime, map, switchMap, takeUntil } from 'rxjs';
import { Voucher } from '../../../../../interface/voucher.interface';

@Component({
    selector: 'app-payment-info',
    templateUrl: './payment-info.component.html',
    styleUrls: ['./payment-info.component.scss'],
    standalone: false
})
export class PaymentInfoComponent implements OnDestroy, OnInit {
  private _notifier$ = new Subject();

  constructor(
    public store: InvoiceStoreService,
    private ledgerService: LedgerService
  ) {}

  // Initialize services (logically separate from constructor for clarity)
  ngOnInit() {
    this.ledgerService.init();
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
    if (this.store.paidAmount() === 0) {
      return 'Unpaid';
    }

    if (this.store.paidAmount() >= this.store.netAmount()) {
      return 'Fully Paid';
    }

    return 'Partially Paid';
  }
}
