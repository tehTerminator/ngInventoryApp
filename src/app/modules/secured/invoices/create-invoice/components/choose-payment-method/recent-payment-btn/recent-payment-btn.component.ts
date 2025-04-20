import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Ledger } from '../../../../../../../interface/ledger.interface';
import { InvoiceStoreService } from './../../../../services/invoice-store.service';
import { take } from 'rxjs';
import { RecentPaymentMethodService } from '../../../services/recentPaymentMethods.service';


@Component({
    selector: 'app-recent-payment-btn',
    templateUrl: './recent-payment-btn.component.html',
    styleUrl: './recent-payment-btn.component.scss',
    standalone: false
})
export class RecentPaymentBtnComponent {
  @ViewChild('recentPaymentBtn') btn!: ElementRef<HTMLInputElement>;
  constructor(private store: InvoiceStoreService, 
    private router: Router, private recentPaymentService: RecentPaymentMethodService
  ) {}

  selectPaymentMethod(ledger: Ledger): void {
    this.store.resetPayment();
    this.store.netAmount.pipe(take(1)).subscribe({
      next: (value) => {
        this.store.addPaymentMethod(ledger.id, value);
        this.router.navigate(['/auth', 'invoices', 'please-wait']);
      },
    });
  }

  get recentPaymentMethods(): Ledger[] {
    return this.recentPaymentService.getPaymentMethods();
  }
}
