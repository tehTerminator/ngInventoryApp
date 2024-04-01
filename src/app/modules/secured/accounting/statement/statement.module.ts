import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatementRoutingModule } from './statement-routing.module';
import { StatementComponent } from './statement.component';
import { FormComponent } from './components/form/form.component';
import { TableComponent } from './components/table/table.component';

import { CoreModule } from './../../../core/core.module';
import { StatementService } from './statement-service/statement.service';


@NgModule({
  declarations: [
    StatementComponent,
    FormComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    StatementRoutingModule,
    CoreModule
  ],
  providers: [StatementService]
})
export class StatementModule { }
