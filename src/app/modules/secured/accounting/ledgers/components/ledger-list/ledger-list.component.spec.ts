import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LedgerListComponent } from './ledger-list.component';

describe('LedgerListComponent', () => {
  let component: LedgerListComponent;
  let fixture: ComponentFixture<LedgerListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LedgerListComponent]
    });
    fixture = TestBed.createComponent(LedgerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
