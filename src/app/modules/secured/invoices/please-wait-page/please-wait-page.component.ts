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
})
export class PleaseWaitPageComponent implements OnInit {
  message = 'Please Wait, Invoice is Being Saved';
  constructor(
    private router: Router,
    private store: InvoiceStoreService, 
    private api: ApiService) {}

  ngOnInit(): void {
    this.setAmount();
  }

  private setAmount() {
    this.store.netAmount
      .pipe(
        take(1),
        finalize(() => {
          if (this.store.snapshot.id > 0) {
            this.store.reset();
            this.message = 'Please Wait, Now You Can Create New Invoice.';
            this.navigateToCreateInvoice();
          } else {
            this.storeInvoice()
          }
        })
      )
      .subscribe({
        next: (value) => (this.store.amount = value),
      });
  }

  private storeInvoice() {
    this.api.create<Invoice>('invoice', {
      invoice: this.store.snapshot,
      vouchers: this.store.vouchers,
    }).subscribe({
      next: ((value) => {
        this.store.id = value.id
        this.message = `Invoice #${value.id} Saved Successfully. Redirecting Please Wait.`
        this.navigateToPrintInvoice();
      }),
    })
  }

  private navigateToPrintInvoice(){
    setTimeout(() => {
      this.router.navigate(['/auth', 'invoices', 'view', this.store.snapshot.id])
    }, 1000);
  }

  private navigateToCreateInvoice() {
    setTimeout(() => {
      this.router.navigate(['/auth', 'invoices', 'create', 'sales']);
    }, 500);
  }
}
