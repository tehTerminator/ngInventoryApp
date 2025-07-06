import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayUnpaidInvoiceRoutingModule } from './pay-unpaid-invoice-routing.module';
import { PayUnpaidInvoiceComponent } from './pay-unpaid-invoice.component';


@NgModule({
  declarations: [
    PayUnpaidInvoiceComponent
  ],
  imports: [
    CommonModule,
    PayUnpaidInvoiceRoutingModule
  ]
})
export class PayUnpaidInvoiceModule { }
