import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductGroupComponent } from './list-product-group.component';

const routes: Routes = [{ path: '', component: ListProductGroupComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListProductGroupRoutingModule { }
