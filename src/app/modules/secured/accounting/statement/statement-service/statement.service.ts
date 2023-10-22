import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EMPTYLEDGER, Ledger } from '../../../../../interface/ledger';
import { ApiService } from '../../../../../services/api/api.service';
import { Cashbook, Statement } from '../components/table/Cashbook';

@Injectable({
    providedIn: 'root'
})
export class StatementService {
  cashbook: BehaviorSubject<Cashbook> = new BehaviorSubject(
    new Cashbook(EMPTYLEDGER, [])
  );

  constructor(private api: ApiService) {}

  fetchData(ledger: Ledger, fromDate: string, toDate: string): void {
    this.api
      .fetch_data<Statement>(['get', 'ledger-statement'], {
        ledger: ledger.id.toString(),
        fromDate,
        toDate,
      })
      .subscribe({
        next: (data) => {
          const newCashbook = new Cashbook(
            ledger,
            data.vouchers,
            data.openingBalance
          );
          this.cashbook.next(newCashbook);
        },
        error: (error) => {
          console.error(error);
          const newCashbook = new Cashbook(ledger, []);
          this.cashbook.next(newCashbook);
        },
      });
  }
}
