import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MatTabsModule } from '@angular/material/tabs';
import { CardWithTextComponent } from './components/card-with-text/card-with-text.component';

@NgModule({
  declarations: [DashboardComponent, CardWithTextComponent],
  imports: [CommonModule, DashboardRoutingModule, MatTabsModule],
})
export class DashboardModule {}
