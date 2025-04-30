import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserSalesRoutingModule } from './user-sales-routing.module';
import { UserSalesComponent } from './user-sales.component';


@NgModule({
  declarations: [
    UserSalesComponent
  ],
  imports: [
    CommonModule,
    UserSalesRoutingModule
  ]
})
export class UserSalesModule { }
