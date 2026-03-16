import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LedgerBalanceService } from '../../../ledger-balance/ledger-balance.service';
import { StatementService } from '../../statement-service/statement.service';

@Component({
  selector: 'app-balance-form',
  template: `
    <mat-card appearance="raised">
      <mat-card-header>
        <mat-card-title>
          Update Balance
        </mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <mat-form-field class="w-100 mt-4" appearance="outline">
          <mat-label>Balance</mat-label>
          <input matInput type="number" [formControl]="amountControl" />
        </mat-form-field>
      </mat-card-content>
      <mat-card-actions>
        <button
          mat-raised-button
          color="primary"
          class="w-100"
          (click)="onSubmit()"
        >
          Submit
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: '',
  standalone: false,
})
export class BalanceFormComponent {
  amountControl = new FormControl(0, { nonNullable: true });
  constructor(
    private balanceStore: LedgerBalanceService,
    private statementService: StatementService
  ) {}

  onSubmit() {
    const date = this.statementService.fromDate;
    const opening = this.amountControl.value;
    const ledgerId = this.statementService.ledger.id;
    this.balanceStore.updateBalance(ledgerId, opening, 0).subscribe({
        next: ((data) => {
            console.log(data);
            this.statementService.fetchData(this.statementService.ledger, this.statementService.fromDate, this.statementService.toDate);
        })
    })
  }
}
