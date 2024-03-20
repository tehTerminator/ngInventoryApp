import { Component } from '@angular/core';
import { SearchInvoiceStoreService } from '../search-invoice/search-store/search-store.service';
import { Invoice } from '../../../../interface/invoice.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent {
  constructor(private store: SearchInvoiceStoreService) {}

  get invoices(): Observable<Invoice[]> {
    return this.store.invoices;
  }
}
