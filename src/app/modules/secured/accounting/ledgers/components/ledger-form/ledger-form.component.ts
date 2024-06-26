import { Component } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import { Ledger } from '../../../../../../interface/ledger.interface';
import { LedgerForm } from './LedgerForm';
import { NotificationsService } from './../../../../../../services/notification/notification.service';
import { LedgerService } from '../../../../../../services/ledger/ledger.service';

@Component({
  selector: 'app-ledger-form',
  templateUrl: './ledger-form.component.html',
  styleUrls: ['./ledger-form.component.scss'],
})
export class LedgerFormComponent {
  readonly kinds = [
    'CAPITAL',
    'BANK',
    'WALLET',
    'DEPOSIT',
    'CASH',
    'PAYABLE',
    'RECEIVABLE',
    'EXPENSE',
    'INCOME',
  ];
  ledgerForm = new LedgerForm();
  isLoading = false;

  constructor(
    private notification: NotificationsService,
    private ledgerService: LedgerService
  ) {}

  ngOnInit(): void {}

  onIdFieldChange(): void {
    this.isLoading = true;
    if (this.ledgerForm.id > 0) {
      try {
        const ledger = this.ledgerService.getElementById(
          this.ledgerForm.id
        ) as Ledger;
        this.ledgerForm.patchValue({
          title: ledger.title,
          kind: ledger.kind,
        });
        this.isLoading = false;
      } catch (e) {
        this.ledgerForm.reset();
        this.isLoading = false;
      }
    } else {
      this.isLoading = false;
    }
  }

  onSubmit(): void {
    if (this.ledgerForm.invalid) {
      this.notification.show('Please Fix Errors in Your Form');
      return;
    }

    this.isLoading = true;
    let response: Observable<Ledger> = EMPTY;

    if (this.ledgerForm.editMode) {
      response = this.ledgerService.update(this.ledgerForm.value);
    } else {
      const data = {...this.ledgerForm.value};
      delete(data.id);
      response = this.ledgerService.create(data);
    }

    this.handleResponse(response);
  }

  private handleResponse(response: Observable<any>): void {
    let message = '';
    if (this.ledgerForm.editMode) {
      message = 'Updated Successfully';
    } else {
      message = 'Created Successfully';
    }

    response.subscribe({
      next: () => {
        this.isLoading = false;
        this.notification.show(message);
        this.ledgerForm.reset();
      },
      error: () => {
        this.notification.show('Error Occurred');
        this.isLoading = false;
      },
    });
  }
}
