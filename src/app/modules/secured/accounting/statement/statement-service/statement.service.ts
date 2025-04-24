import { computed, Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from '../../../../../services/api/api.service';
import { Cashbook, Statement } from '../components/table/Cashbook';
import { EMPTY_LEDGER, Ledger } from './../../../../../interface/ledger.interface';

@Injectable({
    providedIn: 'root'
})
export class StatementService {
  #statement = signal(
    new Cashbook(EMPTY_LEDGER, [])
  );

  statement = computed(() => this.#statement());

  constructor(private api: ApiService) {}

  fetchData(ledger: Ledger, fromDate: string, toDate: string): void {
    console.log('Fetch Data Called');
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
          this.#statement.set(newCashbook);
        },
        error: (error) => {
          console.error(error);
          const newCashbook = new Cashbook(ledger, []);
          this.#statement.set(newCashbook);
        },
      });
  }
}
