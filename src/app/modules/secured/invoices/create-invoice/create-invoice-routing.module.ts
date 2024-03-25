import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateInvoiceComponent } from './create-invoice.component';
import { SelectProductComponent } from './components/select-product/select-product.component';
import { CreateTransactionsComponent } from './components/create-transactions/create-transactions.component';
import { ContactComponent } from './components/contact/contact.component';
import { contactGuard } from './guards/contacts.guard';
import { productGuard } from './guards/products.guard';
import { ChoosePaymentMethodComponent } from './components/choose-payment-method/choose-payment-method.component';

const routes: Routes = [{ path: '', component: CreateInvoiceComponent, children: [
  {
    path: 'select-contact',
    component: ContactComponent,
  },
  {
    path: 'select-product',
    component: SelectProductComponent,
    canActivate: [contactGuard]
  },
  {
    path: 'create-transactions',
    component: CreateTransactionsComponent,
    canActivate: [contactGuard, productGuard]
  },
  {
    path: 'choose-payment-method',
    component: ChoosePaymentMethodComponent
  },
  {
    path: '**',
    redirectTo: 'select-contact',
    pathMatch: 'full'
  }
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateInvoiceRoutingModule { }
