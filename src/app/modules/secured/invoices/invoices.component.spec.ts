import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicesComponent } from './invoices.component';

describe('InvoicesComponent', () => {
  let component: InvoicesComponent;
  let fixture: ComponentFixture<InvoicesComponent>;

<<<<<<< HEAD
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvoicesComponent]
    });
=======
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
>>>>>>> ad5d00ac42238e968ad4da820cc7aaf7ed79ad55
    fixture = TestBed.createComponent(InvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
