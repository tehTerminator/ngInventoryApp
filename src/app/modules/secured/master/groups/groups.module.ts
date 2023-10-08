import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsRoutingModule } from './groups-routing.module';
import { GroupsComponent } from './groups.component';
import { ListGroupsTableComponent } from './components/list-groups-table/list-groups-table.component';
import { GroupsFormComponent } from './components/groups-form/groups-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    GroupsComponent,
    ListGroupsTableComponent,
    GroupsFormComponent
  ],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class GroupsModule { }
