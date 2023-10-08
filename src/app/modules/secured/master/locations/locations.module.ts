import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationsRoutingModule } from './locations-routing.module';
import { LocationsComponent } from './locations.component';
import { CoreModule } from '../../../core/core.module';
import { LocationListComponent } from './components/location-list/location-list.component';
import { LocationFormComponent } from './components/location-form/location-form.component';


@NgModule({
  declarations: [
    LocationsComponent,
    LocationListComponent,
    LocationFormComponent
  ],
  imports: [
    CommonModule,
    LocationsRoutingModule,
    CoreModule
  ]
})
export class LocationsModule { }
