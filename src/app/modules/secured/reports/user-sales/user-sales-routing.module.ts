import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserSalesComponent } from './user-sales.component';

const routes: Routes = [{ path: '', component: UserSalesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserSalesRoutingModule { }
