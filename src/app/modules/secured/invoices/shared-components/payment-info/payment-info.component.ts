import { Component, computed, OnDestroy, OnInit } from '@angular/core';
import { InvoiceStoreService } from '../../services/invoice-store.service';
import { LedgerService } from '../../../../../services/ledger/ledger.service';
import { Voucher } from '../../../../../interface/voucher.interface';

@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.scss'],
  standalone: false,
})
export class PaymentInfoComponent implements OnInit {
  constructor(
    public store: InvoiceStoreService,
    private ledgerService: LedgerService
  ) {}

  // Initialize services (logically separate from constructor for clarity)
  ngOnInit() {
    this.ledgerService.init();
  }

  // Define component methods
  getTitle(id: number) {
    return this.ledgerService.getElementById(id).title;
  }

  removeVoucher(voucher: Voucher) {
    this.store.removePaymentMethod(voucher);
  }

  get paymentStatus(): string {
    return this.store.paymentStatus;
  }
}
