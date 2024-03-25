import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from './../../core/core.module';
import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoicesComponent } from './invoices.component';
import { SharedComponentModule } from './shared-components/shared-components.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ContactsService } from './services/contacts.service';
import { PleaseWaitPageComponent } from './please-wait-page/please-wait-page.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { SearchInvoiceStoreService } from './search-invoice/search-store/search-store.service';
import { InvoiceStoreService } from './services/invoice-store.service';

@NgModule({
  declarations: [
    InvoicesComponent,
    PleaseWaitPageComponent,
    InvoiceListComponent,
  ],
  imports: [
    CommonModule,
    InvoicesRoutingModule,
    CoreModule,
    SharedComponentModule,
    MatAutocompleteModule
  ],
  providers: [
    InvoiceStoreService,
    SearchInvoiceStoreService,
    ContactsService
  ]
})
export class InvoicesModule { }
