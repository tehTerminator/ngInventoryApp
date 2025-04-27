import { Component, OnInit } from '@angular/core';
import { InvoiceStoreService } from '../services/invoice-store.service';
import { finalize, take } from 'rxjs';
import { ApiService } from '../../../../services/api/api.service';
import { Invoice } from '../../../../interface/invoice.interface';
import { Router } from '@angular/router';

@Component({
    selector: 'app-please-wait-page',
    templateUrl: './please-wait-page.component.html',
    styleUrls: ['./please-wait-page.component.scss'],
    standalone: false
})
export class PleaseWaitPageComponent implements OnInit {
  message = 'Please Wait, Invoice is Being Saved';
  constructor(
    private router: Router,
    private store: InvoiceStoreService,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    if (this.store.invoice().id > 0) {
      this.navigateToPrintInvoice();
    } else {
      this.storeInvoice();
    }
  }

  private storeInvoice() {
    this.api
      .create<Invoice>('invoice', {
        invoice: this.store.invoice(),
        vouchers: this.store.paymentInfo(),
      })
      .subscribe({
        next: (value) => {
          this.store.setId(value.id);
          this.message = `Invoice #${value.id} Saved Successfully. Redirecting Please Wait.`;
          this.navigateToPrintInvoice();
        },
        error: () => {
          (this.message = 'An Error Encountered While Saving Invoice'),
            this.navigateToCreateInvoice();
        },
      });
  }

  private navigateToPrintInvoice() {
    setTimeout(() => {
      this.router.navigate([
        '/auth',
        'invoices',
        'view',
        this.store.invoice().id,
      ]);
    }, 1000);
  }

  private navigateToCreateInvoice() {
    setTimeout(() => {
      this.router.navigate(['/auth', 'invoices', 'create', 'sales']);
    }, 500);
  }
}
