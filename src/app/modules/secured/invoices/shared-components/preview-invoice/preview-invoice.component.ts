import { Component, Input, input, OnInit } from '@angular/core';
import { InvoiceStoreService } from './../../services/invoice-store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../../../../../services/api/api.service';
import { Invoice } from '../../../../../interface/invoice.interface';
import { Voucher } from '../../../../../interface/voucher.interface';
import { AuthStoreService } from '../../../../../services/auth-store/auth-store.service';
import { NotificationsService } from '../../../../../services/notification/notification.service';

@Component({
    selector: 'app-preview-invoice',
    templateUrl: './preview-invoice.component.html',
    styleUrls: ['preview-invoice.component.css'],
    standalone: false
})
export class PreviewInvoiceComponent implements OnInit {
  @Input('showButtons') showButtons = true;
  constructor(
    public store: InvoiceStoreService,
    private authStore: AuthStoreService,
    private notificationService: NotificationsService,
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
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
          this.store.setInvoice(value);
        },
        error: (err) => {
          this;
        },
      });
  }

  get invoiceId(): number {
    return this.store.invoice().id;
  }

  /**
   * Delete Invoice
   * @returns void
   * @description
   * 1. Check if the user is allowed to delete the invoice
   * 2. If not, show a notification
   */
  onDeleteBtn(): void {
    if (this.store.invoice().user_id !== this.authStore.user().id) {
      this.notificationService.show("You are not allowed to delete this invoice");
      return;
    }

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

  get unpaid() {
    return this.store.unpaidAmount() > 0;
  }

  gotoCreateNewInvoice = () => this.router.navigate(['/auth', 'invoices', 'create', 'sales']);
  gotoPayUnpaid = () => this.router.navigate(['/auth', 'invoices', 'pay-unpaid']);

  private routeToSearchInvoice = () =>
    this.router.navigate(['/auth', 'invoices', 'search']);
}
