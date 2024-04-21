import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatementRoutingModule } from './statement-routing.module';
import { StatementComponent } from './statement.component';
import { FormComponent } from './components/form/form.component';
import { TableComponent } from './components/table/table.component';

import { CoreModule } from './../../../core/core.module';
import { StatementService } from './statement-service/statement.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@NgModule({
  declarations: [StatementComponent, FormComponent, TableComponent],
  imports: [
    CommonModule,
    StatementRoutingModule,
    CoreModule,
    MatDatepickerModule,
  ],
  providers: [StatementService, provideNativeDateAdapter()],
})
export class StatementModule {}
