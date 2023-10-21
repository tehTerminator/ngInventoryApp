import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VoucherFormComponent } from './voucher-form.component';

const routes: Routes = [{ path: '', component: VoucherFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule { }
