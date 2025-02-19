import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { ApiService } from '../../../../../../services/api/api.service';
import { BehaviorSubject, interval, Subject, takeUntil } from 'rxjs';
import { Observable } from 'rxjs';
import { Voucher } from '../../../../../../interface/voucher.interface';
import { SECOND } from '../../../../../../shared/constants';

@Component({
    selector: 'app-recent-vouchers-list',
    templateUrl: './recent-vouchers-list.component.html',
    styleUrl: './recent-vouchers-list.component.css',
})
export class RecentVouchersListComponent implements AfterViewInit, OnDestroy {
    public loading = false;
    private _vouchers$ = new BehaviorSubject<Voucher[]>([]);
    private _notifier$ = new Subject();
    constructor(private api: ApiService){}

    public fetchData() {
        this.loading = true;
        this.api.retrieve<Voucher[]>(['vouchers', 'recent'])
        .pipe(
            takeUntil(this._notifier$),
        )
        .subscribe({
            next: ((data) => {
                this._vouchers$.next(data);
                this.loading = false;
            }),
            error: () => {
                this._vouchers$.next([]);
                this.loading = false;
            },
        })
    }

    public ngAfterViewInit(): void {
        const number = interval(SECOND * 10);
        number.subscribe({
           next: (() => this.fetchData())
        })
    }

    public ngOnDestroy(): void {
        this._notifier$.next(null);
        this._notifier$.complete();
    }

    get vouchers(): Observable<Voucher[]> {
        return this._vouchers$.asObservable();
    }
}