import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MatTabsModule } from '@angular/material/tabs';
import { CoreModule } from './../../core/core.module';
import { CardWithTextComponent } from './components/card-with-text/card-with-text.component';
import { UnderConstructionComponent } from './components/under-construction/under-construction.component';
import { CardWithTableComponent } from './components/card-with-table/card-with-table.component';
import { ProductListComponent } from './../standalone/product-list/product-list.component';

@NgModule({
  declarations: [
    DashboardComponent,
    CardWithTextComponent,
    CardWithTableComponent,
    UnderConstructionComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatTabsModule,
    ProductListComponent,
    CoreModule,
  ],
})
export class DashboardModule {}
