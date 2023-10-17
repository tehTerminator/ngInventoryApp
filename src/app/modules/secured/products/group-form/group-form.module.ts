import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupFormRoutingModule } from './group-form-routing.module';
import { GroupsFormComponent } from './group-form.component';
import { CoreModule } from './../../../core/core.module';


@NgModule({
  declarations: [
    GroupsFormComponent
  ],
  imports: [
    CommonModule,
    GroupFormRoutingModule,
    CoreModule
  ]
})
export class GroupFormModule { }
