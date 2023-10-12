import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ApiService } from './../../../../../services/api/api.service';
import { BehaviorSubject } from 'rxjs';
import { Voucher } from './../../../../../interface/voucher';

@Component({
  selector: 'app-payment-info',
  templateUrl: './payment-info.component.html',
})
export class PaymentInfoComponent {
  private _invoiceId = 0;
  paymentInfo = new BehaviorSubject<Voucher[]>([]);
  @Input('invoice') 
  set invoiceId(id: number) {
    this._invoiceId = id;
    this.fetchVoucherInfo();
  }
  constructor(private api: ApiService) {}

  private fetchVoucherInfo() {
    this.api.fetch_data<Voucher[]>('invoices/paymentInfo', {id: this._invoiceId.toString()})
    .subscribe({
      next: (data) => this.paymentInfo.next(data),
      error: () => this.paymentInfo.next([])
    })
  }

  get isEmpty(): boolean {
    return this.paymentInfo.value.length === 0;
  }
}
