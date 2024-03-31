import { Component } from '@angular/core';

@Component({
  selector: 'app-udhaar-payment-btn',
  template: `
    <button
      class="btn btn-danger w-100 mt-2"
      [routerLink]="['/auth', 'invoices', 'please-wait']"
    >
      Udhaar
    </button>
  `,
  styles: [],
})
export class UdhaarPaymentBtnComponent {}
