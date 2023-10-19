import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LedgersRoutingModule } from './ledgers-routing.module';
import { LedgersComponent } from './ledgers.component';
import { LedgerFormComponent } from './components/ledger-form/ledger-form.component';
import { LedgerListComponent } from './components/ledger-list/ledger-list.component';

import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    LedgersComponent,
    LedgerFormComponent,
    LedgerListComponent
  ],
  imports: [
    CommonModule,
    LedgersRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ]
})
export class LedgersModule { }
