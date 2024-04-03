import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { SearchInvoiceStoreService } from '../../search-store/search-store.service';
import { Observable, Subject, finalize, map, takeUntil } from 'rxjs';
import { ContactsService } from '../../../../../../services/contacts/contacts.service';
import { InvoiceStoreService } from '../../../services/invoice-store.service';
import { ApiService } from '../../../../../../services/api/api.service';
import { Invoice } from '../../../../../../interface/invoice.interface';
import { Voucher } from '../../../../../../interface/voucher.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-invoice',
  templateUrl: './list-invoice.component.html',
  styleUrl: './list-invoice.component.scss',
})
export class ListInvoiceComponent implements AfterViewInit, OnDestroy {
  loading = false;
  currentPage = 1;
  private totalItems = 0;
  private pageLength = 5;
  private _notifier$ = new Subject();

  constructor(
    private api: ApiService,
    private contactStore: ContactsService,
    private invoiceStore: InvoiceStoreService,
    private router: Router,
    private store: SearchInvoiceStoreService
  ) {}

  get invoices$() {
    return this.store.invoices.pipe(
      map((list) => {
        return list.slice(this.initialItemIndex, this.finalItemIndex);
      })
    );
  }

  ngAfterViewInit(): void {
    this.store.invoices
      .pipe(
        takeUntil(this._notifier$),
        map((value) => {
          return value.length;
        })
      )
      .subscribe({ next: (value) => (this.totalItems = value) });
  }

  ngOnDestroy(): void {
    this._notifier$.next(null);
    this._notifier$.complete();
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

    this.api
      .retrieve<{ invoice: Invoice; vouchers: Voucher[] }>([
        'invoice',
        id.toString(),
      ])
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (value) => {
          this.invoiceStore.invoice = value;
          this.navigateToPreviewInvoice(id);
        },
      });
  }

  private navigateToPreviewInvoice(id: number) {
    this.router.navigate(['/auth', 'invoices', 'view', id]);
  }

  get maxPages() {
    return Math.ceil(this.totalItems / this.pageLength);
  }

  get initialItemIndex() {
    return this.pageLength * (this.currentPage - 1);
  }

  get finalItemIndex() {
    return this.pageLength * this.currentPage;
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.maxPages) {
      this.currentPage++;
    }
  }

  isFirst() {
    return this.currentPage === 1;
  }

  isLast() {
    return this.currentPage === this.maxPages;
  }
}
