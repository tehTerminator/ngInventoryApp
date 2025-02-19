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
    loadChildren: () =>
      import('./vouchers/vouchers.module').then(
        (m) => m.VouchersModule
      ),
  },
  {
    path: 'voucher/:id',
    loadChildren: () =>
      import('./vouchers/vouchers.module').then(
        (m) => m.VouchersModule
      ),
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
  {
    path: 'ledger-balance',
    loadChildren: () =>
      import('./ledger-balance/ledger-balance.module').then(
        (m) => m.LedgerBalanceModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountingRoutingModule {}
