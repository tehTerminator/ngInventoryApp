import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Invoice } from '../../../../../interface/invoice.interface';
import { ApiService } from '../../../../../services/api/api.service';
import { InvoiceStoreService } from '../../services/invoice-store.service';
import { NotificationsService } from './../../../../../services/notification/notification.service';
import { Voucher } from '../../../../../interface/voucher.interface';

@Injectable()
export class SearchInvoiceStoreService {
  invoices = new BehaviorSubject<Invoice[]>([]);

  constructor(
    private api: ApiService,
    private store: InvoiceStoreService,
    private ns: NotificationsService
  ) {}

  fetchUsingUserId(created_at: string, user_id: number) {
    return this.api
      .retrieve<Invoice[]>('invoices', {
        'createdAt:LIKE': created_at + '%',
        user_id: user_id.toString(),
      })
      .pipe(
        tap((data) => {
          this.invoices.next(data);
        }),
      );
  }

  selectInvoice(id: number): void {
    this.api
      .retrieve<{invoice: Invoice, vouchers: Voucher[]}>('invoices', { id: id.toString() })
      .subscribe((data) => (this.store.invoice = data));
  }

  fetchUsingCustomerId(customerId: number, month: string, paid: string): void {
    this.api
      .retrieve<Invoice[]>('invoices', {
        customerId: customerId.toString(),
        month,
        paid,
      })
      .subscribe((data) => this.invoices.next(data));
    // console.log(customerId, month, paid);
  }

  deleteInvoice(invoiceId: number): void {
    this.api.delete('invoices', invoiceId).subscribe(() => {
      this.removeInvoiceFromList(invoiceId);
      this.store.reset();
    });
  }

  private removeInvoiceFromList(invoiceId: number): void {
    console.log('Invoice Id', invoiceId);
    const list = this.invoices.value;
    console.log(list);
    const index = list.findIndex((x) => x.id === invoiceId);
    list.splice(index, 1);
    this.invoices.next(list);
  }
}
