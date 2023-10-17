import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationsTableRoutingModule } from './locations-table-routing.module';
import { LocationsTableComponent } from './locations-table.component';
import { CoreModule } from './../../../core/core.module';

@NgModule({
  declarations: [
    LocationsTableComponent
  ],
  imports: [
    CommonModule,
    LocationsTableRoutingModule,
    CoreModule
  ]
})
export class LocationsTableModule { }
