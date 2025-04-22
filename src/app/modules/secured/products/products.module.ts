import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { CoreModule } from './../../core/core.module';
import { ListUsageComponent } from './list-usage/list-usage.component';
import { provideNativeDateAdapter } from '@angular/material/core';


@NgModule({
  declarations: [
    ProductsComponent,
    ListUsageComponent,
    
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    CoreModule,
    MatDatepickerModule
  ],
  providers: [provideNativeDateAdapter()]
})
export class ProductsModule { }
