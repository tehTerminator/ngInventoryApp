import { computed, Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './../../../../../services/api/api.service';
import { Voucher } from './../../../../../interface/voucher.interface';
import { finalize, map } from 'rxjs/operators';

@Injectable()
export class DayBookService {
  private _loading = false;
  #vouchers = signal([] as DaybookRow[]);
  vouchers = computed(() => this.#vouchers());
  
  fetchData(date: string): void {
    this._loading = true;
    this.api
      .retrieve<DaybookRow[]>('day-book', { date })
      .pipe(finalize(() => (this._loading = false)))
      .subscribe({
        next: (data) => this.#vouchers.set(data),
        error: (err) => console.error(err),
      });
  }

  // getFileteredData(cr: string, dr: string): Observable<Voucher[]> {
  //   return this.dayBook.pipe(
  //     map((dayBook) => {
  //       const filteredData = dayBook.filter((entry) => {
  //         const creditorKinds = cr.split(',');
  //         const debtorKinds = dr.split(',');
  //         return (
  //           creditorKinds.includes(entry.creditor.kind) &&
  //           debtorKinds.includes(entry.debtor.kind)
  //         );
  //       });
  //       return filteredData;
  //     })
  //   );
  // }

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