import { Component, effect, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { debounceTime, map, takeUntil } from 'rxjs/operators';
import { Ledger } from '../../../../../../../interface/ledger.interface';
import { LedgerService } from '../../../../../../../services/ledger/ledger.service';
import { InvoiceStoreService } from '../../../../services/invoice-store.service';
import { SelectLedgerFG } from './SelectLedgerFG';
import { RecentPaymentMethodService } from './../../../services/recentPaymentMethods.service';

@Component({
    selector: 'app-select-ledger-form',
    templateUrl: './select-ledger-form.component.html',
    styles: [],
    standalone: false
})
export class SelectLedgerFormComponent implements OnInit {
  form = new SelectLedgerFG();
  selectedLedgerIds: Array<number> = [];
  loading = false;

  constructor(
    private ledgerService: LedgerService,
    private store: InvoiceStoreService,
    private router: Router,
    private recentPaymentService: RecentPaymentMethodService
  ) {
    effect(() => {
      this.form.patchValue({amount: this.store.unpaidAmount()})
    })
  }

  ngOnInit(): void {
    this.ledgerService.init()
  }

  get ledgers(): Observable<Ledger[]> {
    return (this.ledgerService.getAsObservable() as Observable<Ledger[]>).pipe(
      map((ledgers) =>{
        if (this.store.kind() === 'SALES') {
          return ledgers.filter((x) => x.can_receive_payment === true)
        }
        return ledgers.filter((x) => x.can_pay === true)
      }
      )
    );
  }

  onSubmit(): void {
    this.loading = true;
    if (this.form.invalid) {
      console.log('Invalid select-ledger-form Data');
      return;
    }

    const ledger = this.ledgerService.getElementById(this.form.ledger);
    this.store.addPaymentMethod(this.form.ledger, this.form.amount);
    this.recentPaymentService.savePaymentMethod(ledger);
    
    setTimeout(() => {
      if (this.store.netAmount() > 0 && this.store.unpaidAmount() === 0) {
        this.router.navigate(['/auth', 'invoices', 'please-wait']);
      }
      this.form.patchValue({ ledger: 0 });
      this.loading = false;
    }, 500);
  }

  isSelected(id: number) {
    return this.selectedLedgerIds.includes(id);
  }

  get buttonText() {
    if (this.form.amount === this.store.unpaidAmount()) {
      return 'Final Submit';
    } 
    return 'Add Voucher'
  }
}