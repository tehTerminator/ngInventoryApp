import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationsComponent } from './locations.component';

const routes: Routes = [
  { path: '', component: LocationsComponent },
  {
    path: 'add',
    loadChildren: () =>
      import('./locations-form/locations-form.module').then(
        (m) => m.LocationsFormModule
      ),
  },
  {
    path: 'edit/:id',
    loadChildren: () =>
      import('./locations-form/locations-form.module').then(
        (m) => m.LocationsFormModule
      ),
  },
  {
    path: 'view',
    loadChildren: () =>
      import('./locations-table/locations-table.module').then(
        (m) => m.LocationsTableModule
      ),
  },
  {
    path: 'view/:id',
    loadChildren: () =>
      import('./assign-location/assign-location.module').then(
        (m) => m.AssignLocationModule
      ),
  },
  { path: 'select-location', loadChildren: () => import('./select-location/select-location.module').then(m => m.SelectLocationModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationsRoutingModule {}
