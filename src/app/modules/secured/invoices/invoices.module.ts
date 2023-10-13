import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from './../../core/core.module';
import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoicesComponent } from './invoices.component';
import { SharedComponentModule } from './shared-components/shared-components.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CustomerService } from './services/customer.service';
import { GeneralItemStoreService } from './services/general-item-store.service';
import { InvoiceStoreService } from './services/invoice-store.service';

@NgModule({
  declarations: [
    InvoicesComponent,
  ],
  imports: [
    CommonModule,
    InvoicesRoutingModule,
    CoreModule,
    SharedComponentModule,
    MatAutocompleteModule
  ],
  providers: [
    CustomerService,
    GeneralItemStoreService,
    InvoiceStoreService
  ]
})
export class InvoicesModule { }
