import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceStoreService } from './../../../services/invoice-store.service';
import { NotificationsService } from './../../../../../../services/notification/notification.service';
import { LedgerService } from './../../../../../../services/ledger/ledger.service';
import { CreateTransactionFormGroup } from './CreateTransactionFormGroup';

@Component({
  selector: 'app-create-transactions',
  templateUrl: './create-transactions.component.html',
  styleUrls: ['./create-transactions.component.scss'],
})
export class CreateTransactionsComponent implements OnInit {
  @ViewChild('quantityField')
  quantityField: ElementRef<HTMLInputElement> | null = null;
  transactionForm = new CreateTransactionFormGroup();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private notification: NotificationsService,
    private store: InvoiceStoreService,
    private ledgerService: LedgerService
  ) {  }

  ngOnInit(): void {
    if (!this.ledgerService.isInstanceOfLedger(this.store.selectedItem)) {
      this.transactionForm.rateFormControl.setValue(
        this.store.selectedItem.rate
      );
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

    this.store.createTransaction(
      this.transactionForm.quantity,
      this.transactionForm.rate,
      this.transactionForm.discountPercentage
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
}
