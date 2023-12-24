import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchInvoiceComponent } from './search-invoice.component';

const routes: Routes = [{ path: '', component: SearchInvoiceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchInvoiceRoutingModule { }
