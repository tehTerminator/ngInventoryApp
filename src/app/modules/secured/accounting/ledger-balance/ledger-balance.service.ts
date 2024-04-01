import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { EMPTY_LEDGER, Ledger } from '../../../../interface/ledger.interface';
import { ApiService } from '../../../../services/api/api.service';
import { NotificationsService } from '../../../../services/notification/notification.service';
import { Entity } from '../../../../interface/entity.interface';
import { LedgerService } from '../../../../services/ledger/ledger.service';

@Injectable({
  providedIn: 'root',
})
export class LedgerBalanceService {
  accountBalance = new BehaviorSubject<LedgerBalance[]>([]);

  fetchData(date: string): void {
    this.api.retrieve<LedgerBalance[]>('balance', { date }).subscribe(
      (data) => this.accountBalance.next(data),
      () => this.ns.show('Error Unable to Fetch Data')
    );
  }

  autoSetBalance(): void {
    this.api.update<LedgerBalance[]>('balance', {})
    .subscribe({
      next: ((data) => {
        this.accountBalance.next(data)
      })
    })
  }

  updateBalance(id: number, opening?: number, closing?: number): Observable<LedgerBalance> {
    return this.api.create<LedgerBalance>('balance', {id, opening, closing})
    .pipe(
      tap(ledger => {
        ledger.ledger = this.ledgerService.getElementById(ledger.ledger_id) || EMPTY_LEDGER;
        this.updateItem(ledger);
      }),
      catchError(
        error => {
          console.error(error);
          throw new Error('Unable to Update Balance');
        }
      )
    );
  }

  private updateItem(balance: LedgerBalance) {
    const oldData = this.accountBalance.value;
    const index = oldData.findIndex((item) => {
      return item.ledger_id === balance.ledger_id
    });
    oldData.splice(index, 1, balance);
  }

  constructor(private api: ApiService, private ns: NotificationsService, private ledgerService: LedgerService) {}
}

export interface LedgerBalance extends Entity {
  ledger: Ledger;
  ledger_id: number;
  opening: number;
  closing: number;
}
