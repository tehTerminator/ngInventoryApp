import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BundlesComponent } from './bundles.component';

const routes: Routes = [
  { path: '', component: BundlesComponent },
  {
    path: 'create',
    loadChildren: () => import('./form/form.module').then((m) => m.FormModule),
  },
  {
    path: 'view',
    loadChildren: () => import('./list/list.module').then((m) => m.ListModule),
  },
  {
    path: ':id/template',
    loadChildren: () =>
      import('./template/template.module').then((m) => m.TemplateModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BundlesRoutingModule {}
