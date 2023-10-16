import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationsTableRoutingModule } from './locations-table-routing.module';
import { LocationsTableComponent } from './locations-table.component';


@NgModule({
  declarations: [
    LocationsTableComponent
  ],
  imports: [
    CommonModule,
    LocationsTableRoutingModule
  ]
})
export class LocationsTableModule { }
