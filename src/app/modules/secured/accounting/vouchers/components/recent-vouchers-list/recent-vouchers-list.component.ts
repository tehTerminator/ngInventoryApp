import { Component } from '@angular/core';
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