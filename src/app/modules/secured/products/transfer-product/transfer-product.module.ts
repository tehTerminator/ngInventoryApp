import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransferProductRoutingModule } from './transfer-product-routing.module';
import { TransferProductComponent } from './transfer-product.component';
import { CoreModule } from './../../../core/core.module';

@NgModule({
  declarations: [
    TransferProductComponent
  ],
  imports: [
    CommonModule,
    TransferProductRoutingModule,
    CoreModule
  ]
})
export class TransferProductModule { }
