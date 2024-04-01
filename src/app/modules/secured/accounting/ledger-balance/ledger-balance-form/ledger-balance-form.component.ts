import { Component } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
  UntypedFormControl,
} from '@angular/forms';
import { Subscription, Observable, map } from 'rxjs';
import { Ledger } from '../../../../../interface/ledger.interface';
import { LedgerService } from '../../../../../services/ledger/ledger.service';
import { LedgerBalanceService } from '../ledger-balance.service';
import { NotificationsService } from '../../../../../services/notification/notification.service';

@Component({
  selector: 'app-ledger-balance-form',
  templateUrl: './ledger-balance-form.component.html',
  styleUrl: './ledger-balance-form.component.scss',
})
export class LedgerBalanceFormComponent {
  myForm: UntypedFormGroup = new UntypedFormGroup({});
  private sub: Subscription = new Subscription();
  constructor(
    private fb: UntypedFormBuilder,
    private ns: NotificationsService,
    private balanceStore: LedgerBalanceService,
    private ledgerService: LedgerService
  ) {}

  ngOnInit(): void {
    this.ledgerService.init();
    this.myForm = this.fb.group({
      ledger: [null, Validators.required],
      opening: [0, [Validators.required, Validators.min(0)]],
      closing: [0, [Validators.required, Validators.min(0)]],
    });

    this.sub = this.ledger.valueChanges.subscribe((selectedLedger: Ledger) => {
      if (!!!selectedLedger) {
        return;
      }
      const ledgers = this.balanceStore.accountBalance.value;
      const ledger = ledgers.find((x) => x.ledger_id === selectedLedger.id);
      if (ledger === undefined || ledger === null) {
        return;
      }
      this.myForm.patchValue({
        opening: ledger.opening,
        closing: ledger.closing,
      });
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  get ledgers(): Observable<Ledger[]> {
    return (this.ledgerService.getAsObservable() as Observable<Ledger[]>).pipe(
      map((ledgers) =>
        ledgers.filter((x) => ['BANK','CASH', 'WALLET'].includes(x.kind))
      )
    );
  }

  onSubmit(): void {
    if (this.myForm.invalid) {
      this.ns.show('Error Invalid Form Data');
      return;
    }

    const ledger = this.ledger.value as Ledger;
    const opening = this.opening.value;
    const closing = this.closing.value;

    this.balanceStore.updateBalance(ledger.id, opening, closing).subscribe({
      next: () => {
        this.ns.show('Success Opening and Closing Balance Saved Success');
        this.myForm.reset();
      },
      error: (error) => {
        console.log(error);
        this.ns.show('Error');
      },
    });
  }

  get ledger(): UntypedFormControl {
    return this.myForm.get('ledger') as UntypedFormControl;
  }

  get opening(): UntypedFormControl {
    return this.myForm.get('opening') as UntypedFormControl;
  }

  get closing(): UntypedFormControl {
    return this.myForm.get('closing') as UntypedFormControl;
  }
}
