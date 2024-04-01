import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subject, takeUntil, Observable } from 'rxjs';
import { LedgerBalanceService, LedgerBalance } from '../ledger-balance.service';
import { getCurrentDateString } from '../../../../../shared/functions';

@Component({
  selector: 'app-ledger-balance-list',
  templateUrl: './ledger-balance-list.component.html',
  styleUrl: './ledger-balance-list.component.scss',
})
export class LedgerBalanceListComponent {
  dateField = new FormControl<string>('', {
    nonNullable: false,
    validators: Validators.required,
  });
  hasData = false;
  totalOpening = 0;
  totalClosing = 0;
  private _notifier$ = new Subject();
  constructor(private store: LedgerBalanceService) {}

  ngOnDestroy(): void {
    this._notifier$.next(null);
    this._notifier$.complete();
  }

  ngOnInit(): void {
    this.dateField.setValue(getCurrentDateString());
    this.updateList();
    this.store.accountBalance
      .pipe(takeUntil(this._notifier$))
      .subscribe((data) => {
        this.hasData = data.length > 0;
        this.totalOpening = 0;
        this.totalClosing = 0;

        data.forEach((item) => {
          this.totalOpening += item.opening;
          this.totalClosing += item.closing;
        });
      });
  }

  get data(): Observable<LedgerBalance[]> {
    return this.store.accountBalance;
  }

  updateList = () => this.store.fetchData(this.dateField.value || getCurrentDateString());
}