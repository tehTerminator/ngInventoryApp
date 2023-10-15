import { Component, OnDestroy, OnInit } from '@angular/core';
import { InvoiceStoreService } from './../../services/invoice-store.service';

@Component({
  selector: 'app-preview-invoice',
  templateUrl: './preview-invoice.component.html',
  styleUrls: ['preview-invoice.component.css']
})
export class PreviewInvoiceComponent implements OnInit {
  constructor(public store: InvoiceStoreService) { }

  ngOnInit(): void {
    // this.store.reset();
  }

  get invoiceId(): number {
    // return this.store.invoice.value.id;
    return 0;
  }
}
