import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupsFormComponent } from './group-form.component';

const routes: Routes = [{ path: '', component: GroupsFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupFormRoutingModule { }
