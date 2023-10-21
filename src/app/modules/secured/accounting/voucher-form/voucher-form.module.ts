import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './voucher-form-routing.module';
import { VoucherFormComponent } from './voucher-form.component';
import { CoreModule } from '../../../core/core.module';


@NgModule({
  declarations: [
    VoucherFormComponent
  ],
  imports: [
    CommonModule,
    FormRoutingModule,
    CoreModule
  ]
})
export class VoucherFormModule { }
