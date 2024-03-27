import { Component, OnInit } from '@angular/core';
import { InvoiceStoreService } from './services/invoice-store.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {

  constructor(
    private store: InvoiceStoreService
  ) { }

  ngOnInit(): void {
    // Initialize Services to Be Used Later
    this.store.reset();
  }


}
