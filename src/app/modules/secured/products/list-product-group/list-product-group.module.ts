import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListProductGroupRoutingModule } from './list-product-group-routing.module';
import { ListProductGroupComponent } from './list-product-group.component';
import { CoreModule } from './../../../core/core.module';

@NgModule({
  declarations: [
    ListProductGroupComponent
  ],
  imports: [
    CommonModule,
    ListProductGroupRoutingModule,
    CoreModule
  ]
})
export class ListProductGroupModule { }
