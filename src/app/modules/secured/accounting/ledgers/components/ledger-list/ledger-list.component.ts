import { Component, OnDestroy, OnInit } from '@angular/core';
import { LedgerService } from '../../../../../../services/ledger/ledger.service';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { Ledger } from '../../../../../../interface/ledger.interface';

@Component({
  selector: 'app-ledger-list',
  templateUrl: './ledger-list.component.html',
  styleUrls: ['./ledger-list.component.scss'],
})
export class LedgerListComponent implements OnInit, OnDestroy {
  currentPage = 1;
  private totalItems = 0;
  private pageLength = 5;
  private _notifier$ = new Subject();
  constructor(private ledgerService: LedgerService) {}

  ngOnInit(): void {
    this.ledgerService
      .getAsObservable()
      .pipe(takeUntil(this._notifier$))
      .subscribe({
        next: (value) => (this.totalItems = value.length),
      });
  }

  ngOnDestroy(): void {
    this._notifier$.next(null);
    this._notifier$.complete();
  }

  getLedgerList(): Observable<Ledger[]> {
    return this.ledgerService.getAsObservable().pipe(
      map((list) => {
        return list.slice(this.initialItemIndex, this.finalItemIndex);
      })
    );
  }
  
  get maxPages() {
    return Math.ceil(this.totalItems / this.pageLength);
  }

  get initialItemIndex() {
    return this.pageLength * (this.currentPage - 1);
  }

  get finalItemIndex() {
    return this.pageLength * this.currentPage;
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.maxPages) {
      this.currentPage++
    }
  }

  isFirst() {
    return this.currentPage === 1;
  }

  isLast() {
    return this.currentPage === this.maxPages;
  }

  // get isLastPage$(): Observable<boolean> {
  //   return this.ledgerService.getAsObservable().pipe(map((value) => {
  //     if (this.currentPage)
  //   }))
  // }
}
