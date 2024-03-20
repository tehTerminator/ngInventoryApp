import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from '../../../../../services/api/api.service';
import { Cashbook, Statement } from '../components/table/Cashbook';
import { EMPTY_LEDGER, Ledger } from './../../../../../interface/ledger.interface';

@Injectable({
    providedIn: 'root'
})
export class StatementService {
  cashbook: BehaviorSubject<Cashbook> = new BehaviorSubject(
    new Cashbook(EMPTY_LEDGER, [])
  );

  constructor(private api: ApiService) {}

  fetchData(ledger: Ledger, fromDate: string, toDate: string): void {
    this.api
      .retrieve<Statement>('ledger-statement', {
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
