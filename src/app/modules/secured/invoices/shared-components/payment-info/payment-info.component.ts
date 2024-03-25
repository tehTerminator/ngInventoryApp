import { Component } from '@angular/core';
import { InvoiceStoreService } from '../../services/invoice-store.service';
import { LedgerService } from '../../../../../services/ledger/ledger.service';
import { map } from 'rxjs';
import { Voucher } from '../../../../../interface/voucher.interface';

@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.scss'],
})
export class PaymentInfoComponent {
  // Declare dependencies
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
    console.log('payment-info.removeVoucher', voucher);
    this.store.removePaymentMethod(voucher);
  }

  // Define derived observables
  get paidIsZero$() {
    return this.store.paidAmount.pipe(map((value) => value === 0));
  }
}
