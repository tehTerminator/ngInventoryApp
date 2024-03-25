import { NgModule } from '@angular/core';
import { RouterModule, Routes, TitleStrategy } from '@angular/router';
import { InvoicesComponent } from './invoices.component';
import { TemplatePageTitleStrategy } from './../../../services/title-strategy/title-strategy';
import { PreviewInvoiceComponent } from './shared-components/preview-invoice/preview-invoice.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { PleaseWaitPageComponent } from './please-wait-page/please-wait-page.component';

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
    path: 'view',
    component: InvoiceListComponent,
  },
  {
    path: 'view/:id',
    component: PreviewInvoiceComponent,
  },
  {
    path: 'search',
    loadChildren: () =>
      import('./search-invoice/search-invoice.module').then(
        (m) => m.SearchInvoiceModule
      ),
  },
  {
    path: 'please-wait',
    component: PleaseWaitPageComponent
  },
  {
    path: '**',
    redirectTo: 'search',
    pathMatch: 'full'
  }
];

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
