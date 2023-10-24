import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferProductComponent } from './transfer-product.component';

describe('TransferProductComponent', () => {
  let component: TransferProductComponent;
  let fixture: ComponentFixture<TransferProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransferProductComponent]
    });
    fixture = TestBed.createComponent(TransferProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
