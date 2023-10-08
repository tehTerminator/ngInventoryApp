import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecuredComponent } from './secured.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: SecuredComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: 'master',
        loadChildren: () =>
          import('./master/master.module').then((m) => m.MasterModule),
      },
      {
        path: '404',
        component: PageNotFoundComponent,
      },
      {
        path: 'vouchers',
        loadChildren: () =>
          import('./vouchers/vouchers.module').then((m) => m.VouchersModule),
      },
      {
        path: '**',
        redirectTo: '404',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecuredRoutingModule {}
