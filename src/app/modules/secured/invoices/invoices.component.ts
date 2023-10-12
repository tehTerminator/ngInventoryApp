<<<<<<< HEAD
import { Component } from '@angular/core';
=======
import { Component, OnInit } from '@angular/core';
import { LedgerService } from '../../shared/services/ledger/ledger.service';
import { PosItemService } from '../../shared/services/posItem/pos-item.service';
import { ProductService } from '../../shared/services/product/product.service';
>>>>>>> ad5d00ac42238e968ad4da820cc7aaf7ed79ad55

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
<<<<<<< HEAD
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent {
=======
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {

  constructor(
    private ledgerService: LedgerService,
    private productService: ProductService,
    private posItemService: PosItemService,
  ) { }

  ngOnInit(): void {
    // Initialize Services to Be Used Later
    this.ledgerService.init();
    this.productService.init();
    this.posItemService.init();
  }
>>>>>>> ad5d00ac42238e968ad4da820cc7aaf7ed79ad55

}
