import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, debounceTime } from 'rxjs';
import { Contact, EMPTY_CONTACT } from '../../../../../interface/contact.interface';
import { ContactsService } from './../../../../../services/contacts/contacts.service';
import { InvoiceStoreService } from '../../services/invoice-store.service';

@Component({
    selector: 'app-contact-table',
    templateUrl: './contact-table.component.html',
    styles: ['']
})
export class ContactTableComponent implements OnInit, OnDestroy {
    contact: Contact = EMPTY_CONTACT;
    private _sub = new Subscription();

    constructor(
        private store: InvoiceStoreService,
        private contactService: ContactsService,
    ) {}
    
    ngOnInit(): void {
        this.contactService.init();
        this._sub = this.store.invoice
        .pipe(debounceTime(300))
        .subscribe({
            next: (invoice) =>  {
                try {
                    this.contact = this.contactService.getElementById(invoice.contact_id); 
                } catch (e) {
                    this.contact = EMPTY_CONTACT;
                }
            }
        });
    }

    ngOnDestroy(): void {
        this._sub.unsubscribe();
    }
}
