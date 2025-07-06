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
import { GeneralItemStoreService } from './services/general-item-store.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { SetDiscountComponent } from './components/set-discount/set-discount.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { SearchCustomerComponent } from './components/search-customer/search-customer.component';
import { RecentPaymentMethodService } from '../services/recentPaymentMethods.service';

@NgModule({
  declarations: [
    CreateInvoiceComponent,
    NavigationBtnComponent,
    SelectContactComponent,
    SelectProductComponent,
    SearchCustomerComponent,
    ContactComponent,
    CreateContactFormComponent,
    SetDiscountComponent,
  ],
  imports: [
    CommonModule,
    CreateInvoiceRoutingModule,
    SharedComponentModule,
    CoreModule,
    MatExpansionModule,
    MatTabsModule,
    MatChipsModule,
  ],
  providers: [GeneralItemStoreService, RecentPaymentMethodService],
})
export class CreateInvoiceModule {}
