import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsFormRoutingModule } from './products-form-routing.module';
import { ProductsFormComponent } from './products-form.component';
import { CoreModule } from './../../../core/core.module';

@NgModule({
  declarations: [
    ProductsFormComponent
  ],
  imports: [
    CommonModule,
    ProductsFormRoutingModule,
    CoreModule
  ]
})
export class ProductsFormModule { }
