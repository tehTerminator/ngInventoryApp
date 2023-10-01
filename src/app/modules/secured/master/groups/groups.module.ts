import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsRoutingModule } from './groups-routing.module';
import { GroupsComponent } from './groups.component';
import { ListGroupsTableComponent } from './components/list-groups-table/list-groups-table.component';
import { GroupsFormComponent } from './components/groups-form/groups-form.component';


@NgModule({
  declarations: [
    GroupsComponent,
    ListGroupsTableComponent,
    GroupsFormComponent
  ],
  imports: [
    CommonModule,
    GroupsRoutingModule
  ]
})
export class GroupsModule { }
