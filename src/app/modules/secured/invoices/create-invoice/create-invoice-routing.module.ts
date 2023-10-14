import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateInvoiceComponent } from './create-invoice.component';
import { SelectCustomerComponent } from './components/select-customer/select-customer.component';
import { SelectProductComponent } from './components/select-product/select-product.component';
import { CreateTransactionsComponent } from './components/create-transactions/create-transactions.component';
import { SetPaymentMethodComponent } from './components/set-payment-method/set-payment-method.component';

const routes: Routes = [{ path: '', component: CreateInvoiceComponent, children: [
  {
    path: 'select-customer',
    component: SelectCustomerComponent,
  },
  {
    path: 'select-product',
    component: SelectProductComponent
  },
  {
    path: 'create-transactions',
    component: CreateTransactionsComponent
  },
  {
    path: 'payment-method',
    component: SetPaymentMethodComponent
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
