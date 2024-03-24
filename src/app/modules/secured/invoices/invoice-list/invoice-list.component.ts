import { Component } from '@angular/core';
import { SearchInvoiceStoreService } from '../search-invoice/search-store/search-store.service';
import { Invoice } from '../../../../interface/invoice.interface';
import { Observable } from 'rxjs';
import { ContactsService } from '../services/contacts.service';
import { EMPTY_CONTACT } from '../../../../interface/contact.interface';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent {
  constructor(
    private store: SearchInvoiceStoreService,
    private contactService: ContactsService,
  ) {}

  get invoices(): Observable<Invoice[]> {
    return this.store.invoices;
  }

  contact(id: number) {
    try {
      return this.contactService.getElementById(id);
    } catch (e) {
      return EMPTY_CONTACT;
    }
  }

}
