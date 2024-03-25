import { Component, OnInit } from '@angular/core';
import { ContactsService } from './services/contacts.service';
import { LedgerService } from '../../../services/ledger/ledger.service';
import { ProductService } from '../../../services/product/product.service';
import { BundleService } from '../../../services/bundle/bundle.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {

  constructor(
    private contactService: ContactsService,
    private ledgerService: LedgerService,
    private productService: ProductService,
    private bundleService: BundleService
  ) { }

  ngOnInit(): void {
    // Initialize Services to Be Used Later
    this.ledgerService.init();
    this.productService.init();
    this.bundleService.init();
    this.contactService.init();
  }


}
