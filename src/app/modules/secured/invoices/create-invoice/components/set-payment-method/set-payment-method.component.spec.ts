import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetPaymentMethodComponent } from './set-payment-method.component';

describe('SetPaymentMethodComponent', () => {
  let component: SetPaymentMethodComponent;
  let fixture: ComponentFixture<SetPaymentMethodComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetPaymentMethodComponent]
    });
    fixture = TestBed.createComponent(SetPaymentMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
