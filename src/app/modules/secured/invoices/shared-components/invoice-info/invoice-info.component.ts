import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { InvoiceStoreService } from '../../services/invoice-store.service';

@Component({
  selector: 'app-invoice-info',
  templateUrl: './invoice-info.component.html',
  styles: [''],
  standalone: false,
})
export class InvoiceInfoComponent {
  ngOnInit(): void {}

  get invoiceId() {
    return this.store.invoice().id;
  }

  get customerId() {
    return this.store.invoice().contact_id;
  }

  get createdAt() {
    return this.store.invoice().created_at;
  }

  get kind() {
    return this.store.kind();
  }

  constructor(private store: InvoiceStoreService) {}
}
