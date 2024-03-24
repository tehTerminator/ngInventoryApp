import { Injectable } from '@angular/core';
import { BaseService } from '../../class/BaseService';
import { Ledger } from '../../interface/ledger.interface';
import { ApiService } from './../api/api.service';
import { NotificationsService } from './../notification/notification.service';
import { catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HOUR } from '../../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class LedgerService extends BaseService<Ledger> {

  constructor(private api: ApiService, private notification: NotificationsService) {
    super('ledgers', HOUR);
  }

  protected fetch(): void {
    this.api.retrieve<Ledger[]>('ledgers').subscribe({
      next: (ledgers) => {
        this.store(ledgers);
      },
      error: (error) => {
        this._data.next([]);
        this.notification.show('An Error Occurred While Fetching Ledgers');
        console.log(error);
      }
  });
  }

  create(ledger: Ledger): Observable<Ledger> {
    return this.api.create<Ledger>(['ledger'], ledger)
      .pipe(
        tap(insertedLedger => {
          this.insert(insertedLedger);
        }),
        catchError(error => {
          console.log(error);
          throw new Error('Unable to Create New Ledger');
        })
      );
  }

  update(ledger: Ledger): Observable<Ledger> {
    return this.api.update<Ledger>(['ledger'], ledger)
      .pipe(tap(updatedLedger => {
        this.updateItem(updatedLedger);
      }));
  }

  delete(index: number): Observable<string> {
    try {
      const item = this.get(index);
      return this.api.delete<string>(this.table, item.id)
        .pipe(tap(() => {
          this.deleteItem(index);
        }));
    } catch (e) {
      this.notification.show('Item Does Not Exist');
      throw new Error('Item Not Found Error');
    }
  }

  updateBalance(id: number, opening?: number, closing?: number): Observable<any> {
    return this.api.create<Ledger>('balance', {id, opening, closing})
    .pipe(
      tap(ledger => {
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

  public getElementByTitle(title: string): Ledger {
    const list = this._data.value as Ledger[];
    title = title.toLowerCase();
    if (list.length > 0) {
      const result = list.find(x => x.title.toLowerCase() === title);
      if (!!result) {
        return result;
      }
      throw new Error('Item Not Found');
    }
    throw new Error('List is Empty');
  }

  public isInstanceOfLedger(data: any): data is Ledger {
    return 'kind' in data;
  }
}
