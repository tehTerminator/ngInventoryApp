import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { InvoiceStoreService } from '../../services/invoice-store.service';

@Component({
    selector: 'app-invoice-info',
    templateUrl: './invoice-info.component.html',
    styles: ['']
})
export class InvoiceInfoComponent implements OnInit, OnDestroy {
    invoiceId = 0;
    createdAt = '';
    customerId = 0;
    kind = 'SALES';
    sub: Subscription = new Subscription();

    ngOnInit(): void {
        this.sub = this.store.invoice
            .subscribe(invoice => {
                this.invoiceId = invoice.id;
                this.customerId = invoice.contact_id
                this.createdAt = invoice.created_at || '';
                this.kind = invoice.kind;
            });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    constructor(private store: InvoiceStoreService) { }
}
