import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { InvoiceStoreService } from './../../../services/invoice-store.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-set-discount',
  templateUrl: './set-discount.component.html',
  styleUrl: './set-discount.component.scss',
})
export class SetDiscountComponent {
  discountAmountFC = new FormControl<number>(0, [
    Validators.required,
    Validators.min(0),
  ]);

  onSetDiscount() {
    const discount = this.discountAmountFC.value;
    this.store.discount = discount || 0;

    this.navigateToChoosePayment();
  }

  private navigateToChoosePayment(){
    this.router.navigate(['../choose-payment-method'], {relativeTo: this.route});
  }

  constructor(private router: Router, private route: ActivatedRoute, private store: InvoiceStoreService) {}
}
