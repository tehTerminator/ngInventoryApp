import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { InvoiceStoreService } from '../../../services/invoice-store.service';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    standalone: false
})
export class ContactComponent implements OnInit, OnDestroy {
  private _sub = new Subscription();
  constructor(private store: InvoiceStoreService) {}
  isSales = true;

  ngOnInit(): void {
    this._sub = this.store.invoice.subscribe({
      next: (invoice) => this.isSales = invoice.kind === 'SALES',
    });
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }
}
