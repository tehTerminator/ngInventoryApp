import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectProductComponent } from './select-product.component';

describe('SelectProductComponent', () => {
  let component: SelectProductComponent;
  let fixture: ComponentFixture<SelectProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectProductComponent]
    });
    fixture = TestBed.createComponent(SelectProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
