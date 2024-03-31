import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-choose-payment-method',
  templateUrl: './choose-payment-method.component.html',
})
export class ChoosePaymentMethodComponent implements AfterViewInit  {
  hasRecent = false;

  ngAfterViewInit(): void {
    if(localStorage.getItem("recentPaymentMethod")) {
      this.hasRecent = true;
    } else {
      this.hasRecent = false;
    }
  }

}
