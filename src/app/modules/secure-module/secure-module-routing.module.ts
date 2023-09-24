import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecureModuleComponent } from './secure-module.component';

const routes: Routes = [
  { 
    path: '', component: SecureModuleComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: '**',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecureModuleRoutingModule {}
