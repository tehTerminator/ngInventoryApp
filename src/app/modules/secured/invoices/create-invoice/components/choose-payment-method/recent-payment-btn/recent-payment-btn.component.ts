import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Ledger } from '../../../../../../../interface/ledger.interface';
import { InvoiceStoreService } from './../../../../services/invoice-store.service';
import { take } from 'rxjs';
import { RecentPaymentMethodService } from '../../../services/recentPaymentMethods.service';


@Component({
    selector: 'app-recent-payment-btn',
    templateUrl: './recent-payment-btn.component.html',
    styleUrl: './recent-payment-btn.component.scss',
    standalone: false
})
export class RecentPaymentBtnComponent {
  @ViewChild('recentPaymentBtn') btn!: ElementRef<HTMLInputElement>;
  constructor(
    private store: InvoiceStoreService, 
    private recentPaymentService: RecentPaymentMethodService
  ) {}

  selectPaymentMethod(ledger: Ledger): void {
    this.store.resetPayment();
    this.store.addPaymentMethod(ledger.id, this.store.netAmount());
  }

  get recentPaymentMethods(): Ledger[] {
    return this.recentPaymentService.getPaymentMethods();
  }
}
