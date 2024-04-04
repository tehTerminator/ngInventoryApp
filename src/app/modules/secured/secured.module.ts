import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';

import { SecuredRoutingModule } from './secured-routing.module';
import { SecuredComponent } from './secured.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { CurrencyTableComponent } from './calculator/currency-table/currency-table.component';
import { CurrencyFormComponent } from './calculator/currency-form/currency-form.component';
import { EvaluatorComponent } from './calculator/evaluator/evaluator.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { LeftMenuComponent } from './components/left-menu/left-menu.component';
import { RightMenuComponent } from './components/right-menu/right-menu.component';

@NgModule({
  declarations: [
    SecuredComponent,
    NavBarComponent,
    CalculatorComponent,
    EvaluatorComponent,
    CurrencyTableComponent,
    CurrencyFormComponent,
    PageNotFoundComponent,
    LeftMenuComponent,
    RightMenuComponent,
  ],
  imports: [
    CommonModule,
    SecuredRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
  ],
})
export class SecuredModule {}
