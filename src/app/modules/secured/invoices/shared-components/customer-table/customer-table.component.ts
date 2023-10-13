import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { InvoiceStoreService } from './../../services/invoice-store.service';
import { Contact } from './../../../../../interface/contact';

@Component({
    selector: 'app-customer-table',
    templateUrl: './customer-table.component.html',
    styles: ['']
})
export class CustomerTableComponent implements OnInit, OnDestroy {
    customer: Contact | null = null;
    private sub: Subscription = new Subscription();

    ngOnInit(): void {
        // this.sub = this.store.invoice.subscribe(
        //     (invoice => this.customer = invoice.customer)
        // );
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    constructor(private store: InvoiceStoreService) { }
}
