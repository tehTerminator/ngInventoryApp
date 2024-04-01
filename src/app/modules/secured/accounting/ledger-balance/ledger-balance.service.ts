import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Ledger } from '../../../../interface/ledger.interface';
import { ApiService } from '../../../../services/api/api.service';
import { NotificationsService } from '../../../../services/notification/notification.service';
import { Entity } from '../../../../interface/entity.interface';

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

  constructor(private api: ApiService, private ns: NotificationsService) {}
}

export interface LedgerBalance extends Entity {
  ledger: Ledger;
  ledger_id: number;
  opening: number;
  closing: number;
}
