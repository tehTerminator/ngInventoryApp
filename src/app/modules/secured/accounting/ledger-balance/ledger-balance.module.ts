import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LedgerBalanceRoutingModule } from './ledger-balance-routing.module';
import { LedgerBalanceComponent } from './ledger-balance.component';
import { AutoSetButtonComponent } from './auto-set-button/auto-set-button.component';
import { LedgerBalanceFormComponent } from './ledger-balance-form/ledger-balance-form.component';
import { LedgerBalanceListComponent } from './ledger-balance-list/ledger-balance-list.component';
import { CoreModule } from './../../../core/core.module';


@NgModule({
  declarations: [
    LedgerBalanceComponent,
    AutoSetButtonComponent,
    LedgerBalanceFormComponent,
    LedgerBalanceListComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    LedgerBalanceRoutingModule
  ]
})
export class LedgerBalanceModule { }
