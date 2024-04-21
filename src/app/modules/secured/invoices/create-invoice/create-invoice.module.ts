import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateInvoiceRoutingModule } from './create-invoice-routing.module';
import { CreateInvoiceComponent } from './create-invoice.component';
import { SharedComponentModule } from './../shared-components/shared-components.module';
import { NavigationBtnComponent } from './components/navigation-btn/navigation-btn.component';
import { SelectContactComponent } from './components/select-contact/select-contact.component';
import { CoreModule } from '../../../core/core.module';
import { SelectProductComponent } from './components/select-product/select-product.component';
import { ContactComponent } from './components/contact/contact.component';
import { CreateContactFormComponent } from './components/create-contact-form/create-contact-form.component';
import { ChoosePaymentMethodComponent } from './components/choose-payment-method/choose-payment-method.component';
import { RecentPaymentBtnComponent } from './components/choose-payment-method/recent-payment-btn/recent-payment-btn.component';
import { SelectLedgerFormComponent } from './components/choose-payment-method/select-ledger-form/select-ledger-form.component';
import { UdhaarPaymentBtnComponent } from './components/choose-payment-method/udhaar-payment-btn/udhaar-payment-btn.component';
import { GeneralItemStoreService } from './services/general-item-store.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { SetDiscountComponent } from './components/set-discount/set-discount.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    CreateInvoiceComponent,
    NavigationBtnComponent,
    SelectContactComponent,
    SelectProductComponent,
    ContactComponent,
    CreateContactFormComponent,
    ChoosePaymentMethodComponent,
    RecentPaymentBtnComponent,
    SelectLedgerFormComponent,
    UdhaarPaymentBtnComponent,
    SetDiscountComponent,
  ],
  imports: [
    CommonModule,
    CreateInvoiceRoutingModule,
    SharedComponentModule,
    CoreModule,
    MatExpansionModule,
    MatTabsModule,
  ],
  providers: [GeneralItemStoreService],
})
export class CreateInvoiceModule {}
