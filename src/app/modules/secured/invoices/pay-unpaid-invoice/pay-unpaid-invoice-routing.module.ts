import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PayUnpaidInvoice } from './pay-unpaid-invoice';

const routes: Routes = [{ path: '', component: PayUnpaidInvoice }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayUnpaidInvoiceRoutingModule { }
