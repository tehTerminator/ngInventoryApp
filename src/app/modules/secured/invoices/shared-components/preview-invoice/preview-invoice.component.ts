import { Component, Input, signal, computed, OnInit } from '@angular/core';
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
  @Input() showButtons = true;
  #isAuthorComputed = computed(() => {
    const invoice = this.store.invoice(); // Read the invoice signal
    const user = this.authStore.user();   // Read the user signal

    // Add checks for initial/undefined states if they can occur
    if (!invoice || !user) {
      return false; // Or handle as appropriate, e.g., throw an error or show a loading state
    }
    return invoice.user_id === user.id;
  });

  // Expose it as a computed signal
  isAuthor = this.#isAuthorComputed; // No need for another computed() here, just assign

  isAdmin = computed(() => this.authStore.user().role_id === 1);

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

    this.#loadInvoice(id);
  }

  #loadInvoice(id: string) {
    this.api
      .retrieve<{ invoice: Invoice; vouchers: Voucher[] }>(['invoice', id])
      .subscribe({
        next: (value) => {
          this.store.setInvoice(value);
        },
        error: (err) => {
          this.notificationService.show('Error Occurred');
          console.error(err);
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
    if (!(this.isAuthor() || this.isAdmin())) {
      this.notificationService.show("You are not allowed to delete this invoice");
      return;
    }

    if (this.invoiceId <= 0) {
      return;
    }

    this.api.delete<any>('invoice', this.invoiceId).subscribe({
      next: (value) => {
        console.log(value);
        this.#routeToSearchInvoice();
      },
    });
  }

  get unpaid() {
    return this.store.unpaidAmount() > 0;
  }

  gotoCreateNewInvoice = () => this.router.navigate(['/auth', 'invoices', 'create', 'sales']);
  gotoPayUnpaid = () => this.router.navigate(['/auth', 'invoices', 'pay-unpaid']);

  #routeToSearchInvoice = () =>
    this.router.navigate(['/auth', 'invoices', 'search']);
}
