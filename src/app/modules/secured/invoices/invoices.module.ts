import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from './../../core/core.module';
import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoicesComponent } from './invoices.component';
import { SharedComponentModule } from './shared-components/shared-components.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CustomerService } from './services/customer.service';
import { InvoiceStoreService } from './services/invoice-store.service';
import { PleaseWaitPageComponent } from './please-wait-page/please-wait-page.component';

@NgModule({
  declarations: [
    InvoicesComponent,
    PleaseWaitPageComponent,
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
    InvoiceStoreService
  ]
})
export class InvoicesModule { }
