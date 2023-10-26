import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PleaseWaitPageComponent } from './please-wait-page.component';

describe('PleaseWaitPageComponent', () => {
  let component: PleaseWaitPageComponent;
  let fixture: ComponentFixture<PleaseWaitPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PleaseWaitPageComponent]
    });
    fixture = TestBed.createComponent(PleaseWaitPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
