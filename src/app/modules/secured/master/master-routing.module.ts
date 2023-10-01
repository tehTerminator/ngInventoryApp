import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterComponent } from './master.component';

const routes: Routes = [{ path: '', component: MasterComponent }, { path: 'groups', loadChildren: () => import('./groups/groups.module').then(m => m.GroupsModule) }, { path: 'ledgers', loadChildren: () => import('./ledgers/ledgers.module').then(m => m.LedgersModule) }, { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
