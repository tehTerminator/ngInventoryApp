import { NgModule } from '@angular/core';
<<<<<<< HEAD
import { RouterModule, Routes } from '@angular/router';
import { InvoicesComponent } from './invoices.component';

const routes: Routes = [{ path: '', component: InvoicesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
=======
import { RouterModule, Routes, TitleStrategy } from '@angular/router';
import { InvoicesComponent } from './invoices.component';
import { ChoosePaymentMethodComponent } from './pages/choose-payment-method/choose-payment-method.component';
import { CreateTransactionComponent } from './sub-pages/create-transaction/create-transaction.component';
import { ListItemsComponent } from './sub-pages/list-items/list-items.component';
import { SelectCustomerComponent } from './sub-pages/select-customer/select-customer.component';
import { WaitPageComponent } from './pages/wait-page/wait-page.component';
import { TemplatePageTitleStrategy } from './../../../services/title-strategy/title-strategy';

const routes: Routes = [
  {
    path: 'create', title: 'Create Invoice', component: InvoicesComponent, children: [
      { path: 'select-customer', component: SelectCustomerComponent },
      { path: 'list-items', component: ListItemsComponent },
      { path: 'transactions', component: CreateTransactionComponent },
      { path: 'paymentMethod', component: ChoosePaymentMethodComponent },
      { path: '**', redirectTo: 'select-customer', pathMatch: 'full' }
    ],
  },
  {
    path: 'search',
    title: 'Search Invoice',
    loadChildren: () => import('./pages/search-invoice/search-invoice.module')
      .then(m => m.SearchInvoiceModule)
  },
  { path: 'wait', component: WaitPageComponent },
  { path: '**', redirectTo: 'search', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [{
    provide: TitleStrategy,
    useClass: TemplatePageTitleStrategy
  }]
>>>>>>> ad5d00ac42238e968ad4da820cc7aaf7ed79ad55
})
export class InvoicesRoutingModule { }
