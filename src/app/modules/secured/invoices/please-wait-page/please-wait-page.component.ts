import { Component, OnInit } from '@angular/core';
import { InvoiceStoreService } from '../services/invoice-store.service';
import { ApiService } from '../../../../services/api/api.service';
import { BASE_INVOICE, Invoice } from '../../../../interface/invoice.interface';
import { Router } from '@angular/router';
import { Voucher } from 'src/app/interface/voucher.interface';
import { finalize } from 'rxjs';

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
    if (this.store.invoiceExists() && this.store.paymentInfoExists()) {
      this.navigateToPrintInvoice();
      return;
    }

    if (this.store.invoiceExists() && !this.store.paymentInfoExists()) {
      this.updatePaymentInfo();
      return;
    }

    this.storeInvoice();
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

  private updatePaymentInfo() {
    this.api.update<Invoice>('paymentInfo', {
      invoice_id: this.store.invoice().id.toString(),
      vouchers: this.store.paymentInfo().filter(x=>x.id === 0),
    })
    .pipe(finalize(() => {
      this.navigateToPrintInvoice();
    }))
    .subscribe({
      next: ((data) => this.store.setId(data.id)),
      error: ((err) => {
        console.error(err);
        this.store.setInvoice({invoice: BASE_INVOICE, vouchers: [] as Voucher[]});
      })
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
    }, 500);
  }

  private navigateToCreateInvoice() {
    setTimeout(() => {
      this.router.navigate(['/auth', 'invoices', 'create', 'sales']);
    }, 500);
  }
}
