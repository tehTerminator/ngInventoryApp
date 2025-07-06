import { computed, Injectable, signal } from '@angular/core';
import { ApiService } from '../../../../../services/api/api.service';
import { Ledger } from './../../../../../interface/ledger.interface';
import { Entity } from 'src/app/interface/entity.interface';
import { finalize } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StatementService {
  #statement = signal([] as CashbookRow[]);
  #loading = signal(false);
  statement = computed(() => this.#statement());
  loading = computed(() => this.#loading());

  constructor(private api: ApiService) {}

  fetchData(ledger: Ledger, fromDate: string, toDate: string): void {
    this.#loading.set(true);
    this.api
      .retrieve<CashbookRow[]>('ledger-statement', {
        ledger: ledger.id.toString(),
        fromDate,
        toDate,
      })
      .pipe(
        finalize(() => {
          this.#loading.set(false);
        })
      )
      .subscribe({
        next: (data) => {
          this.#statement.set(data);
        },
        error: (error) => {
          console.error(error);
          this.#statement.set([]);
        },
      });
  }
}

export interface CashbookRow extends Entity {
  date: string;
  transfer: string;
  narration: string;
  cr: number;
  dr: number;
  balance: number;
}

