import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListProductRoutingModule } from './list-product-routing.module';
import { ListProductComponent } from './list-product.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CoreModule } from './../../../core/core.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    ListProductComponent
  ],
  imports: [
    CommonModule,
    ListProductRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    CoreModule,
    MatIconModule
  ]
})
export class ListProductModule { }
