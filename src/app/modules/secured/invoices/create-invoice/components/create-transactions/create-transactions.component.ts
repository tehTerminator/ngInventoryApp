import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceStoreService } from './../../../services/invoice-store.service';
import { TransactionForm } from './TransactionForm';

@Component({
  selector: 'app-create-transactions',
  templateUrl: './create-transactions.component.html',
  styleUrls: ['./create-transactions.component.scss'],
})
export class CreateTransactionsComponent implements OnInit {
  transactionForm = new TransactionForm();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: InvoiceStoreService
  ) {}

  ngOnInit(): void {
    this.transactionForm.patchValue({
      product_id: this.store.product.value?.id
    });
  }

  onSubmit() {
    if (!this.transactionForm.valid) {
      return;
    }


    console.log({
      ...this.transactionForm.value,
      invoice_id: 0,
    })
    
    this.store.addTransaction({
      ...this.transactionForm.value,
      invoice_id: 0,
      user_id: 0,
      product: this.store.product.value
    });

    const type = this.route.snapshot.paramMap.get('type');

    this.router.navigate(['../select-product'], {
      relativeTo: this.route,
      queryParams: {
        type,
      }
    });
  }
}


