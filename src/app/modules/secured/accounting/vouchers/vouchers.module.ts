import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './vouchers-routing.module';
import { VoucherFormComponent } from './components/voucher-form/voucher-form.component';
import { CoreModule } from '../../../core/core.module';
import { RecentVouchersListComponent } from './components/recent-vouchers-list/recent-vouchers-list.component';
import { VouchersComponent } from './vouchers.component';
import { RecentVouchersService } from './recent-vouchers.service';


@NgModule({
  declarations: [
    VouchersComponent,
    VoucherFormComponent,
    RecentVouchersListComponent
  ],
  imports: [
    CommonModule,
    FormRoutingModule,
    CoreModule
  ],
  providers: [RecentVouchersService]
})
export class VouchersModule { }
