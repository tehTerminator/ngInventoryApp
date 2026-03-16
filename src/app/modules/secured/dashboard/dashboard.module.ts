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
import { ProductsUsedComponent } from './components/products-used/products-used.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { MatCardModule } from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { OperatorSalesChartComponent } from './components/operator-sales-chart/operator-sales.chart.component';

@NgModule({
  declarations: [
    DashboardComponent,
    CardWithTextComponent,
    CardWithTableComponent,
    ProductsUsedComponent,
    TaskListComponent,
    UnderConstructionComponent,
    OperatorSalesChartComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatTabsModule,
    MatCardModule,
    MatToolbarModule,
    MatDialogModule,  
    ProductListComponent,
    CoreModule,
  ],
})
export class DashboardModule {}
