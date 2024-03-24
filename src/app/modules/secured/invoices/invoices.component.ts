import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactsService } from './services/contacts.service';
import { LedgerService } from '../../../services/ledger/ledger.service';
import { ProductService } from '../../../services/product/product.service';
import { BundleService } from '../../../services/bundle/bundle.service';
// import { LedgerService } from '../../shared/services/ledger/ledger.service';
// import { PosItemService } from '../../shared/services/posItem/pos-item.service';
// import { ProductService } from '../../shared/services/product/product.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {

  title = '';

  constructor(
    private route: ActivatedRoute,
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
