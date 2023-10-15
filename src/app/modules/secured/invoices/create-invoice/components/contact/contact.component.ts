import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { InvoiceStoreService } from '../../../services/invoice-store.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {
  private _sub = new Subscription();
  constructor(private store: InvoiceStoreService) {}
  contactType = 'PARTY';

  ngOnInit(): void {
    this._sub = this.store.invoice.subscribe({
      next: (invoice) => {
        const type = invoice.kind;
        switch (type) {
          case 'sales':
            this.contactType = 'Party'
            break;
          default:
            this.contactType = 'Supplier'
            break;
        }
      }
    });
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  get titleOne(): string {
    return `Select ${this.contactType}`;
  }

  get titleTwo(): string {
    return `Create New ${this.contactType}`;
  }

}
