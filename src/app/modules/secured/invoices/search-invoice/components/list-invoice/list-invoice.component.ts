import { Component } from '@angular/core';
import { SearchInvoiceStoreService } from '../../search-store/search-store.service';
import { Observable, finalize } from 'rxjs';
import { ContactsService } from '../../../../../../services/contacts/contacts.service';
import { InvoiceStoreService } from '../../../services/invoice-store.service';
import { ApiService } from '../../../../../../services/api/api.service';
import { Invoice } from '../../../../../../interface/invoice.interface';
import { Voucher } from '../../../../../../interface/voucher.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-invoice',
  templateUrl: './list-invoice.component.html',
  styleUrl: './list-invoice.component.scss'
})
export class ListInvoiceComponent {
  loading = false;

  constructor(
    private api: ApiService,
    private contactStore: ContactsService,
    private invoiceStore: InvoiceStoreService,
    private router: Router,
    private store: SearchInvoiceStoreService,
  ) {}

  get invoices$() {
    return this.store.invoices;
  }

  getContactName(id: number) {
    try {
      return this.contactStore.getElementById(id).title;
    } catch (e) {
      return 'NO_CONTACT';
    }
  }

  previewInvoice(id: number) {
    this.loading = true;

    this.api.retrieve<{invoice: Invoice, vouchers: Voucher[]}>(['invoice', id.toString()])
    .pipe(finalize(() => this.loading = false))
    .subscribe({
      next: ((value) => {
        this.invoiceStore.invoice = value;
        this.navigateToPreviewInvoice(id);
      })
    });


  }

  private navigateToPreviewInvoice(id: number) {
    this.router.navigate(['/auth', 'invoices', 'view', id]);
  }
}
