import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class SelectLedgerFormComponent implements OnInit, OnDestroy {
  form = new SelectLedgerFG();
  selectedLedgerIds: Array<number> = [];
  unpaidAmount = 0;
  private netAmount = 0;
  private notifier$ = new Subject<void>();
  loading = false;

  constructor(
    private ledgerService: LedgerService,
    private store: InvoiceStoreService,
    private router: Router,
    private recentPaymentService: RecentPaymentMethodService
  ) {}

  ngOnInit(): void {

    this.ledgerService.init()

    this.store.paidAmount
      .pipe(takeUntil(this.notifier$), debounceTime(200))
      .subscribe({
        next: (paidAmount) => {
          this.unpaidAmount = this.netAmount - paidAmount;
          this.form.amountFC.setValue(this.unpaidAmount);
        },
      });

    this.store.netAmount.pipe(takeUntil(this.notifier$)).subscribe({
      next: (value) => {
        this.netAmount = value;
      },
    });

    this.store.paymentInfo$.pipe(takeUntil(this.notifier$)).subscribe({
      next: (value) => [
        (this.selectedLedgerIds = value.map((items) => items.dr)),
      ],
    });
  }

  ngOnDestroy(): void {
    this.notifier$.next();
    this.notifier$.complete();
  }

  get ledgers(): Observable<Ledger[]> {
    return (this.ledgerService.getAsObservable() as Observable<Ledger[]>).pipe(
      map((ledgers) =>
        ledgers.filter((x) => ['BANK', 'CASH', 'WALLET'].includes(x.kind))
      )
    );
  }

  onSubmit(): void {
    this.loading = true;
    if (this.form.invalid) {
      console.log('Invalid select-ledger-form Data');
      return;
    }

    this.store.addPaymentMethod(this.form.ledger, this.form.amount);
    
    setTimeout(() => {
      if (this.unpaidAmount === 0) {
        this.storeLastPaymentMethod();
        this.router.navigate(['/auth', 'invoices', 'please-wait']);
      }
      this.form.patchValue({ ledger: 0 });
      this.loading = false;
    }, 500);
  }

  isSelected(id: number) {
    return this.selectedLedgerIds.includes(id);
  }

  private storeLastPaymentMethod() {
    const ledger = this.ledgerService.getElementById(this.form.ledger);
    this.recentPaymentService.savePaymentMethod(ledger);
  }

  get allowFinalSubmit(): boolean {
    return this.unpaidAmount === this.form.amount;
  }
}