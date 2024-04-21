import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MatTabsModule } from '@angular/material/tabs';
import { CoreModule } from './../../core/core.module';
import { CardWithTextComponent } from './components/card-with-text/card-with-text.component';
import { UnderConstructionComponent } from './components/under-construction/under-construction.component';

@NgModule({
  declarations: [DashboardComponent, CardWithTextComponent, UnderConstructionComponent],
  imports: [CommonModule, DashboardRoutingModule, MatTabsModule, CoreModule],
})
export class DashboardModule {}
