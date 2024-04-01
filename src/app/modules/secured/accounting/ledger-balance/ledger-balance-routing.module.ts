import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LedgerBalanceComponent } from './ledger-balance.component';

const routes: Routes = [{ path: '', component: LedgerBalanceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LedgerBalanceRoutingModule { }
