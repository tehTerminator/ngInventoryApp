import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DaybookRoutingModule } from './daybook-routing.module';
import { DaybookComponent } from './daybook.component';


@NgModule({
  declarations: [
    DaybookComponent
  ],
  imports: [
    CommonModule,
    DaybookRoutingModule
  ]
})
export class DaybookModule { }
