import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateInvoiceRoutingModule } from './create-invoice-routing.module';
import { CreateInvoiceComponent } from './create-invoice.component';
import { SharedComponentModule } from '../shared-components/shared-components.module';
import { GoBackBtnComponent } from './components/go-back-btn/go-back-btn.component';
import { SelectContactComponent } from './components/select-contact/select-contact.component';
import { CoreModule } from '../../../core/core.module';
import { SelectProductComponent } from './components/select-product/select-product.component';
import { CreateTransactionsComponent } from './components/create-transactions/create-transactions.component';
import { SetPaymentMethodComponent } from './components/set-payment-method/set-payment-method.component';
import { ContactComponent } from './components/contact/contact.component';
import { CreateContactFormComponent } from './components/create-contact-form/create-contact-form.component';

@NgModule({
  declarations: [
    CreateInvoiceComponent,
    GoBackBtnComponent,
    SelectContactComponent,
    SelectProductComponent,
    CreateTransactionsComponent,
    SetPaymentMethodComponent,
    ContactComponent,
    CreateContactFormComponent
  ],
  imports: [
    CommonModule,
    CreateInvoiceRoutingModule,
    SharedComponentModule,
    CoreModule
  ]
})
export class CreateInvoiceModule { }
