import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayUnpaidInvoiceRoutingModule } from './pay-unpaid-invoice-routing.module';
import { PayUnpaidInvoiceComponent } from './pay-unpaid-invoice.component';
import { SharedComponentModule } from '../shared-components/shared-components.module';


@NgModule({
  declarations: [
    PayUnpaidInvoiceComponent
  ],
  imports: [
    CommonModule,
    PayUnpaidInvoiceRoutingModule,
    SharedComponentModule,
  ]
})
export class PayUnpaidInvoiceModule { }