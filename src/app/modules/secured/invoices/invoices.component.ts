import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    // private ledgerService: LedgerService,
    // private productService: ProductService,
    // private posItemService: PosItemService,
  ) { }

  ngOnInit(): void {
    // Initialize Services to Be Used Later
    // this.ledgerService.init();
    // this.productService.init();
    // this.posItemService.init();
    this.route.paramMap.subscribe(
      {
        next: (value) => this.title = value.get('type') || ''
      }
    );
  }


}
