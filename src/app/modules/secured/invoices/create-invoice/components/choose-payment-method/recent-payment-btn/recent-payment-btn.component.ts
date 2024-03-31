import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  EMPTY_LEDGER,
  Ledger,
} from '../../../../../../../interface/ledger.interface';
import { InvoiceStoreService } from './../../../../services/invoice-store.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-recent-payment-btn',
  template: ` <button
    *ngIf="recentPaymentMethod"
    class="btn btn-secondary w-100 p-3 mt-2"
    (click)="selectPaymentMethod(recentPaymentMethod)"
  >
    {{ recentPaymentMethod.title }}
  </button>
  <h1 *ngIf="!recentPaymentMethod">No Recent Payment Saved</h1>
  `,
})
export class RecentPaymentBtnComponent {
  constructor(private store: InvoiceStoreService, private router: Router) {}

  selectPaymentMethod(ledger: Ledger): void {
    this.store.resetPayment();
    this.store.netAmount.pipe(take(1)).subscribe({
      next: (value) => {
        this.store.addPaymentMethod(ledger.id, value);
        this.router.navigate(['/auth', 'invoices', 'please-wait']);
      },
    });
  }

  get recentPaymentMethod(): Ledger | null {
    const recent = localStorage.getItem('recentPaymentMethod');
    if (recent !== null) {
      return JSON.parse(recent);
    }
    return null;
  }
}
