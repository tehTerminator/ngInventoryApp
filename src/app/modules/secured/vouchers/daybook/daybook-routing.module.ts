import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DaybookComponent } from './daybook.component';

const routes: Routes = [{ path: '', component: DaybookComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DaybookRoutingModule { }
