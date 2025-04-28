import { Component, computed } from '@angular/core';
import { RecentPaymentMethodService } from '../../services/recentPaymentMethods.service';

@Component({
    selector: 'app-choose-payment-method',
    templateUrl: './choose-payment-method.component.html',
    standalone: false
})
export class ChoosePaymentMethodComponent {
  hasRecent = computed(() => this.recentPaymentService.length() > 0)

  constructor(private recentPaymentService: RecentPaymentMethodService) {}
}
