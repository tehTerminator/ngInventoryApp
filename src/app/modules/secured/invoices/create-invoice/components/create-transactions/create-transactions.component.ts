import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceStoreService } from './../../../services/invoice-store.service';

@Component({
  selector: 'app-create-transactions',
  templateUrl: './create-transactions.component.html',
  styleUrls: ['./create-transactions.component.scss'],
})
export class CreateTransactionsComponent implements OnInit {
  transactionForm = new TransactionForm();
  product_id = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: InvoiceStoreService
  ) {}

  ngOnInit(): void {
    const pid = this.route.snapshot.queryParamMap.get('product_id');

    if (!!pid) {
      this.product_id = +pid;
    }
  }

  onSubmit() {
    if (!this.transactionForm.valid) {
      return;
    }


    console.log({
      ...this.transactionForm.value,
      invoice_id: 0,
      product_id: this.product_id,
      user_id: 0,
      narration: 0,
    })
    
    this.store.addTransaction({
      ...this.transactionForm.value,
      invoice_id: 0,
      product_id: this.product_id,
      user_id: 0,
      narration: 0,
    });

    const type = this.route.snapshot.paramMap.get('type');

    this.router.navigate(['../payment-method'], {
      relativeTo: this.route,
      queryParams: {
        type,
      }
    });
  }
}

class TransactionForm extends FormGroup {
  constructor() {
    super({
      quantity: new FormControl(0, Validators.required),
      rate: new FormControl(0, Validators.required),
      gst: new FormControl(0, Validators.required),
      amount: new FormControl(0, Validators.required),
    });
  }

  get quantityFormControl(): FormControl<number> {
    return this.get('quantity') as FormControl<number>;
  }
  get rateFormControl(): FormControl<number> {
    return this.get('rate') as FormControl<number>;
  }
  get gstFormControl(): FormControl<number> {
    return this.get('gst') as FormControl<number>;
  }
  get amountFormControl(): FormControl<number> {
    return this.get('amount') as FormControl<number>;
  }

  get quantity(): number {
    return this.quantityFormControl.value;
  }
  get rate(): number {
    return this.rateFormControl.value;
  }
  get gst(): number {
    return this.gstFormControl.value;
  }
  get amount(): number {
    return this.amountFormControl.value;
  }
}
