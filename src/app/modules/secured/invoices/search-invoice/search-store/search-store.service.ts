import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Invoice } from '../../../../../interface/invoice.interface';
import { ApiService } from '../../../../../services/api/api.service';
import { InvoiceStoreService } from '../../services/invoice-store.service';
import { NotificationsService } from './../../../../../services/notification/notification.service';

@Injectable()
export class SearchInvoiceStoreService {
  invoices = new BehaviorSubject<Invoice[]>([]);

  constructor(
    private api: ApiService,
    private store: InvoiceStoreService,
    private ns: NotificationsService
  ) {}

  fetchUsingUserId(createdAt: string, userId: number): Observable<boolean> {
    return this.api
      .retrieve<Invoice[]>('invoices', {
        createdAt,
        userId: userId.toString(),
      })
      .pipe(
        tap((data) => {
          if (data.length === 0) {
            this.ns.show('No Record Found');
            return;
          }
          this.invoices.next(data);
          console.log(this.invoices.value);
        }),
        map((data) => data.length >= 1)
      );
  }

  selectInvoice(id: number): void {
    this.api
      .retrieve<Invoice>('invoices', { id: id.toString() })
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
