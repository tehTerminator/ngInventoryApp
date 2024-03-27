import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-choose-payment-method',
  template: `
    <app-recent-payment-btn></app-recent-payment-btn>
    <app-select-ledger-form></app-select-ledger-form>
    <app-udhaar-payment-btn></app-udhaar-payment-btn>
  `,
})
export class ChoosePaymentMethodComponent {}
