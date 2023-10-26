import { NgModule } from '@angular/core';
import { RouterModule, Routes, TitleStrategy } from '@angular/router';
import { InvoicesComponent } from './invoices.component';
import { TemplatePageTitleStrategy } from './../../../services/title-strategy/title-strategy';
import { PreviewInvoiceComponent } from './shared-components/preview-invoice/preview-invoice.component';

const routes: Routes = [
  { path: '', component: InvoicesComponent },
  {
    path: 'create/:type',
    loadChildren: () =>
      import('./create-invoice/create-invoice.module').then(
        (m) => m.CreateInvoiceModule
      ),
  },
  {
    path: 'view/:id',
    component: PreviewInvoiceComponent
  }
];

// const routes: Routes = [
//   {
//     path: 'create', title: 'Create Invoice', component: InvoicesComponent, children: [
//       { path: 'select-customer', component: SelectCustomerComponent },
//       { path: 'list-items', component: ListItemsComponent },
//       { path: 'transactions', component: CreateTransactionComponent },
//       { path: 'paymentMethod', component: ChoosePaymentMethodComponent },
//       { path: '**', redirectTo: 'select-customer', pathMatch: 'full' }
//     ],
//   },
//   {
//     path: 'search',
//     title: 'Search Invoice',
//     loadChildren: () => import('./pages/search-invoice/search-invoice.module')
//       .then(m => m.SearchInvoiceModule)
//   },
//   { path: 'wait', component: WaitPageComponent },
//   { path: '**', redirectTo: 'search', pathMatch: 'full' }
// ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide: TitleStrategy,
      useClass: TemplatePageTitleStrategy,
    },
  ],
})
export class InvoicesRoutingModule {}
