import { Component } from '@angular/core';
import { InvoiceStoreService } from '../../../services/invoice-store.service';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    standalone: false
})
export class ContactComponent {
  constructor(private store: InvoiceStoreService) {}

  get isSales() {
    return this.store.kind() === 'SALES';
  }
}
