import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectLocationRoutingModule } from './select-location-routing.module';
import { SelectLocationComponent } from './select-location.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SelectLocationComponent
  ],
  imports: [
    CommonModule,
    SelectLocationRoutingModule,
    ReactiveFormsModule
  ]
})
export class SelectLocationModule { }
