import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecureModuleComponent } from './secure-module.component';

describe('SecureModuleComponent', () => {
  let component: SecureModuleComponent;
  let fixture: ComponentFixture<SecureModuleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecureModuleComponent]
    });
    fixture = TestBed.createComponent(SecureModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
