import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { InvoiceStoreService } from './../../../services/invoice-store.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-set-discount',
  templateUrl: './set-discount.component.html',
  styleUrl: './set-discount.component.scss',
})
export class SetDiscountComponent implements AfterViewInit {
  @ViewChild('firstInputField') input!: ElementRef<HTMLInputElement>;

  discountAmountFC = new FormControl<number>(0, [
    Validators.required,
    Validators.min(0),
  ]);
  discountFG = new FormGroup({
    discount: this.discountAmountFC,
  });

  ngAfterViewInit(): void {
    if (this.input !== null) {
      this.input.nativeElement.focus();
    }
  }

  onSetDiscount() {
    const discount = this.discountAmountFC.value;
    this.store.discount = discount || 0;

    this.navigateToChoosePayment();
  }

  private navigateToChoosePayment() {
    this.router.navigate(['../choose-payment-method'], {
      relativeTo: this.route,
    });
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: InvoiceStoreService
  ) {}
}
