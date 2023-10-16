import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationsTableComponent } from './locations-table.component';

const routes: Routes = [{ path: '', component: LocationsTableComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationsTableRoutingModule { }
