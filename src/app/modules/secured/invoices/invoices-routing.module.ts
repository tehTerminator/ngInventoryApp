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
