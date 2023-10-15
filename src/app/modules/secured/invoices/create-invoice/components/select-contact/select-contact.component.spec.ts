import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectContactComponent } from './select-contact.component';

describe('SelectContactComponent', () => {
  let component: SelectContactComponent;
  let fixture: ComponentFixture<SelectContactComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectContactComponent]
    });
    fixture = TestBed.createComponent(SelectContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
