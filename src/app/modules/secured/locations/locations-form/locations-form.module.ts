import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationsFormRoutingModule } from './locations-form-routing.module';
import { LocationsFormComponent } from './locations-form.component';

import { CoreModule } from './../../../core/core.module';


@NgModule({
  declarations: [
    LocationsFormComponent
  ],
  imports: [
    CommonModule,
    LocationsFormRoutingModule,
    CoreModule
  ]
})
export class LocationsFormModule { }
