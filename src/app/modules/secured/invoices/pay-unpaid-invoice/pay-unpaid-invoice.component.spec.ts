import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayUnpaidInvoiceComponent } from './pay-unpaid-invoice.component';

describe('PayUnpaidInvoiceComponent', () => {
  let component: PayUnpaidInvoiceComponent;
  let fixture: ComponentFixture<PayUnpaidInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PayUnpaidInvoiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayUnpaidInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
