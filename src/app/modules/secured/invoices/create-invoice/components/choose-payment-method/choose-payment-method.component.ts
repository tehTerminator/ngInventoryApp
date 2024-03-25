import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-payment-method',
  templateUrl: './choose-payment-method.component.html',
  styleUrls: ['./choose-payment-method.component.css']
})
export class ChoosePaymentMethodComponent implements OnInit {
  constructor(
    private router: Router) { }

  ngOnInit(): void {
  }
}
