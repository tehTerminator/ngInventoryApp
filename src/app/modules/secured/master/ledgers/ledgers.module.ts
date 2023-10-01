import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LedgersRoutingModule } from './ledgers-routing.module';
import { LedgersComponent } from './ledgers.component';


@NgModule({
  declarations: [
    LedgersComponent
  ],
  imports: [
    CommonModule,
    LedgersRoutingModule
  ]
})
export class LedgersModule { }
