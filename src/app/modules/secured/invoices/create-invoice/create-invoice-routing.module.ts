import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateInvoiceComponent } from './create-invoice.component';
import { SelectProductComponent } from './components/select-product/select-product.component';
import { CreateTransactionsComponent } from './components/create-transactions/create-transactions.component';
import { ContactComponent } from './components/contact/contact.component';
import { FinalSubmitComponent } from './components/final-submit/final-submit.component';

const routes: Routes = [{ path: '', component: CreateInvoiceComponent, children: [
  {
    path: 'select-contact',
    component: ContactComponent,
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
    path: 'final-submit',
    component: FinalSubmitComponent
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
