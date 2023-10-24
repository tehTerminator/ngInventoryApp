import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationsTableRoutingModule } from './locations-table-routing.module';
import { LocationsTableComponent } from './locations-table.component';
import { CoreModule } from './../../../core/core.module';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [
    LocationsTableComponent
  ],
  imports: [
    CommonModule,
    LocationsTableRoutingModule,
    CoreModule,
    MatExpansionModule
  ]
})
export class LocationsTableModule { }
