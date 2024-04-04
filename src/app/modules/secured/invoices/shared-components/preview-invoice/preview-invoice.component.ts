import { Component, OnDestroy, OnInit } from '@angular/core';
import { InvoiceStoreService } from './../../services/invoice-store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, distinctUntilChanged } from 'rxjs';
import { ApiService } from './../../../../../services/api/api.service';
import { Invoice } from '../../../../../interface/invoice.interface';
import { Voucher } from '../../../../../interface/voucher.interface';

@Component({
  selector: 'app-preview-invoice',
  templateUrl: './preview-invoice.component.html',
  styleUrls: ['preview-invoice.component.css'],
})
export class PreviewInvoiceComponent implements OnInit {
  constructor(
    public store: InvoiceStoreService,
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === undefined || id === null) {
      return;
    }

    this.loadInvoices(id);
  }

  private loadInvoices(id: string) {
    this.api
      .retrieve<{ invoice: Invoice; vouchers: Voucher[] }>(['invoice', id])
      .subscribe({
        next: (value) => {
          this.store.invoice = value;
        },
        error: (err) => {
          this;
        },
      });
  }

  get invoiceId(): number {
    return this.store.snapshot.id;
  }

  onDeleteBtn() {
    if (this.invoiceId <= 0) {
      return;
    }

    this.api.delete<any>('invoice', this.invoiceId).subscribe({
      next: (value) => {
        console.log(value);
        this.routeToSearchInvoice();
      },
    });
  }

  private routeToSearchInvoice = () =>
    this.router.navigate(['/auth', 'invoices', 'search']);
}
