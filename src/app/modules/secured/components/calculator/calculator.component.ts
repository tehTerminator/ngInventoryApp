import { Component } from '@angular/core';


@Component({
    selector: 'app-calculator',
    template: `
    <h2 mat-dialog-title>Calculator</h2>
    <div mat-dialog-content>
      <app-currency-form></app-currency-form>
      <app-currency-table></app-currency-table>
    </div>
  `,
    styles: [''],
    standalone: false
})
export class CalculatorComponent {}

