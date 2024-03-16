import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateRoutingModule } from './template-routing.module';
import { TemplateComponent } from './template.component';
import { BundleStoreService } from './services/bundle-store.service';
import { BundleTitleComponent } from './components/bundle-title/bundle-title.component';
import { TemplateFormComponent } from './components/template-form/template-form.component';
import { TemplateListComponent } from './components/template-list/template-list.component';


@NgModule({
  declarations: [
    TemplateComponent,
    BundleTitleComponent,
    TemplateFormComponent,
    TemplateListComponent
  ],
  imports: [
    CommonModule,
    TemplateRoutingModule
  ],
  providers: [
    BundleStoreService
  ]
})
export class TemplateModule { }
