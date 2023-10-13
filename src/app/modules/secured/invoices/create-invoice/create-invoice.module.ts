import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateInvoiceRoutingModule } from './create-invoice-routing.module';
import { CreateInvoiceComponent } from './create-invoice.component';
import { SharedComponentModule } from '../shared-components/shared-components.module';
import { GoBackBtnComponent } from './components/go-back-btn/go-back-btn.component';
import { SelectCustomerComponent } from './components/select-customer/select-customer.component';
import { CoreModule } from '../../../core/core.module';
import { SelectProductComponent } from './components/select-product/select-product.component';

@NgModule({
  declarations: [
    CreateInvoiceComponent,
    GoBackBtnComponent,
    SelectCustomerComponent,
    SelectProductComponent
  ],
  imports: [
    CommonModule,
    CreateInvoiceRoutingModule,
    SharedComponentModule,
    CoreModule
  ]
})
export class CreateInvoiceModule { }
