import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContactsService } from './../../../../../services/contacts/contacts.service';
import { InvoiceStoreService } from '../../services/invoice-store.service';
import { EMPTY_CONTACT } from '../../../../../interface/contact.interface';

@Component({
    selector: 'app-contact-table',
    templateUrl: './contact-table.component.html',
    styles: [''],
    standalone: false
})
export class ContactTableComponent implements OnInit {
  constructor(
    private store: InvoiceStoreService,
    private contactService: ContactsService
  ) {}

  ngOnInit(): void {
    this.contactService.init();
  }

  get contact() {
    try {
      const contactToDisplay = this.contactService.getElementById(this.store.invoice().contact_id);
      return contactToDisplay;
    } catch {
      return EMPTY_CONTACT;
    }
  }

}
