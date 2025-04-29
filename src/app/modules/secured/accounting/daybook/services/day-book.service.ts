import { computed, Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './../../../../../services/api/api.service';
import { Voucher } from './../../../../../interface/voucher.interface';
import { finalize, map } from 'rxjs/operators';

@Injectable()
export class DayBookService {
  private _loading = false;
  #data = signal([] as DaybookRow[]);
  data = computed(() => this.#data());
  
  fetchData(date: string): void {
    this._loading = true;
    this.api
      .retrieve<DaybookRow[]>('day-book', { date })
      .pipe(finalize(() => (this._loading = false)))
      .subscribe({
        next: (data) => this.#data.set(data),
        error: (err) => console.error(err),
      });
  }

  get loading(): boolean {
    return this._loading;
  }

  constructor(private api: ApiService) {}
}


export interface DaybookRow {
  creditor: string;
  creditor_kind: string;
  debtor: string;
  debtor_kind: string;
  amount: number;
}