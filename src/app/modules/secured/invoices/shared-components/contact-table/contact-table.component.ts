import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from '../../../../../interface/contact'
import { InvoiceStoreService } from '../../services/invoice-store.service';
import { ApiService } from '../../../../../services/api/api.service';

@Component({
    selector: 'app-contact-table',
    templateUrl: './contact-table.component.html',
    styles: ['']
})
export class ContactTableComponent implements OnInit, OnDestroy {
    contact: Contact | null = null;
    private _sub = new Subscription();

    constructor(private api: ApiService, private store: InvoiceStoreService) {}
    
    ngOnInit(): void {
        this._sub = this.store.invoice.subscribe({
            next: (invoice) => this.contact = invoice.contact
        });
    }

    ngOnDestroy(): void {
        this._sub.unsubscribe();
    }
}
