import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchInvoiceRoutingModule } from './search-invoice-routing.module';
import { SearchByContactComponent } from './components/search-by-contact/search-by-contact.component';
import { SearchByDateComponent } from './components/search-by-date/search-by-date.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SearchInvoiceStoreService } from './search-store/search-store.service';
import { SearchInvoiceComponent } from './search-invoice.component';
import { ListInvoiceComponent } from './components/list-invoice/list-invoice.component';
import { CoreModule } from './../../../core/core.module';


@NgModule({
  declarations: [
    SearchInvoiceComponent,
    SearchByContactComponent,
    SearchByDateComponent,
    ListInvoiceComponent
  ],
  imports: [
    CommonModule,
    SearchInvoiceRoutingModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    CoreModule,
  ],
  providers: [SearchInvoiceStoreService]
})
export class SearchInvoiceModule { }
