import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceStoreService } from './../../../services/invoice-store.service';
import { NotificationsService } from './../../../../../../services/notification/notification.service';
import { LedgerService } from './../../../../../../services/ledger/ledger.service';
import { TransactionForm } from './TransactionForm';
import { Validators, UntypedFormControl } from '@angular/forms';
import { Transaction, BASE_TRANSACTION } from '../../../../../../interface/invoice.interface';

@Component({
  selector: 'app-create-transactions',
  templateUrl: './create-transactions.component.html',
  styleUrls: ['./create-transactions.component.scss'],
})
export class CreateTransactionsComponent implements OnInit {
  @ViewChild('quantityField')
  quantityField: ElementRef<HTMLInputElement> | null = null;
  transactionForm = new TransactionForm();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private notification: NotificationsService,
    private store: InvoiceStoreService,
    private ledgerService: LedgerService
  ) {}

  ngOnInit(): void {
    if (
      !this.ledgerService.isInstanceOfLedger(this.store.selectedItem) &&
      this.store.selectedItem !== null
    ) {
      this.transactionForm.patchValue({
        rate: this.store.selectedItem.rate,
      });
    }

    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  ngAfterViewInit(): void {
    if (this.quantityField !== null) {
      this.quantityField.nativeElement.focus();
    }
  }

  onSubmit(): void {
    if (this.transactionForm.invalid) {
      this.notification.show('Invalid Form Data');
      return;
    }

    if (this.discountPercent >= 90) {
      this.notification.show('Discount Too High');
      return;
    }

    this.store.createTransaction(
      this.quantity.value,
      this.rate.value,
      this.discountPercent
    );
    this.navigateToSelectProduct();
  }

  private navigateToSelectProduct() {
    // Get the current :type parameter from the route
    const type = this.route.snapshot.paramMap.get('type');
    this.router.navigate(['../select-product'], {
      relativeTo: this.route,
      queryParams: { type: type },
    });
  }

  get productName(): string {
    if (this.store.selectedItem !== null) {
      return this.store.selectedItem.title;
    }
    return '';
  }

  get grossPrice(): number {
    return this.quantity.value * this.rate.value;
  }

  get discountPercent(): number {
    const val = (this.discount.value / this.grossPrice) * 100;
    if (isNaN(val)) {
      return 0;
    }
    return val;
  }

  get netPrice(): number {
    return this.grossPrice - this.discount.value;
  }

  get quantity(): UntypedFormControl {
    return this.transactionForm.get('quantity') as UntypedFormControl;
  }

  get rate(): UntypedFormControl {
    return this.transactionForm.get('rate') as UntypedFormControl;
  }

  get discount(): UntypedFormControl {
    return this.transactionForm.get('discount') as UntypedFormControl;
  }
}
