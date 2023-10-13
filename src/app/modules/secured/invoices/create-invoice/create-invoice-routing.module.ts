import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateInvoiceComponent } from './create-invoice.component';
import { SelectCustomerComponent } from './components/select-customer/select-customer.component';

const routes: Routes = [{ path: '', component: CreateInvoiceComponent, children: [
  {
    path: 'select-customer',
    component: SelectCustomerComponent,
  },
  {
    path: '**',
    redirectTo: 'select-customer',
    pathMatch: 'full'
  }
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateInvoiceRoutingModule { }
