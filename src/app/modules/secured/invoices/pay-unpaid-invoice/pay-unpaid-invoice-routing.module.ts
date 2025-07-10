import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PayUnpaidInvoiceComponent } from './pay-unpaid-invoice.component';

const routes: Routes = [{ path: '', component: PayUnpaidInvoiceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayUnpaidInvoiceRoutingModule { }
