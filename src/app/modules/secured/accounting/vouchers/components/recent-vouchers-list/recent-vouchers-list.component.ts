import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { ApiService } from '../../../../../../services/api/api.service';
import { BehaviorSubject, EMPTY, interval, Subject, Subscription, takeUntil } from 'rxjs';
import { Observable } from 'rxjs';
import { Voucher } from '../../../../../../interface/voucher.interface';
import { SECOND } from '../../../../../../shared/constants';
import { RecentVouchersService } from '../../recent-vouchers.service';

@Component({
    selector: 'app-recent-vouchers-list',
    templateUrl: './recent-vouchers-list.component.html',
    styleUrl: './recent-vouchers-list.component.css',
    standalone: false
})
export class RecentVouchersListComponent {
    constructor(private recentVoucherService: RecentVouchersService){}

    get vouchers() {
        return this.recentVoucherService.voucher();
    }
}