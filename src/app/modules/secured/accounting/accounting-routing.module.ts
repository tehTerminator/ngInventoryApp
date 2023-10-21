import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountingComponent } from './accounting.component';

const routes: Routes = [
  { path: '', component: AccountingComponent },
  {
    path: 'ledgers',
    loadChildren: () =>
      import('./ledgers/ledgers.module').then((m) => m.LedgersModule),
  },
  {
    path: 'voucher',
    loadChildren: () => import('./form/form.module').then((m) => m.FormModule),
  },
  {
    path: 'statement',
    loadChildren: () =>
      import('./statement/statement.module').then((m) => m.StatementModule),
  },
  {
    path: 'daybook',
    loadChildren: () =>
      import('./daybook/daybook.module').then((m) => m.DaybookModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountingRoutingModule {}
