import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchInvoiceRoutingModule } from './search-invoice-routing.module';
import { SearchInvoiceComponent } from './search-invoice.component';
import { DeleteInvoiceComponent } from './components/delete-invoice/delete-invoice.component';
import { SearchByContactComponent } from './components/search-by-contact/search-by-contact.component';
import { SearchByDateComponent } from './components/search-by-date/search-by-date.component';
import { SearchByUserComponent } from './components/search-by-user/search-by-user.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SearchInvoiceStoreService } from './search-store/search-store.service';


@NgModule({
  declarations: [
    SearchInvoiceComponent,
    DeleteInvoiceComponent,
    SearchByContactComponent,
    SearchByDateComponent,
    SearchByUserComponent
  ],
  imports: [
    CommonModule,
    SearchInvoiceRoutingModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule
  ]
})
export class SearchInvoiceModule { }
