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
    path: 'temp',
    loadChildren: () =>
      import('./template-form/template-form.module').then(
        (m) => m.TemplateFormModule
      ),
  },
  {
    path: 'view',
    loadChildren: () => import('./list/list.module').then((m) => m.ListModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BundlesRoutingModule {}
