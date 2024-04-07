import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Ledger } from '../../../../../../../interface/ledger.interface';
import { InvoiceStoreService } from './../../../../services/invoice-store.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-recent-payment-btn',
  templateUrl: './recent-payment-btn.component.html',
  styleUrl: './recent-payment-btn.component.scss',
})
export class RecentPaymentBtnComponent implements AfterViewInit {
  @ViewChild('recentPaymentBtn') btn!: ElementRef<HTMLInputElement>;
  constructor(private store: InvoiceStoreService, private router: Router) {}

  ngAfterViewInit(): void {
    if (this.btn) {
      this.btn.nativeElement.focus();
    }
  }

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
