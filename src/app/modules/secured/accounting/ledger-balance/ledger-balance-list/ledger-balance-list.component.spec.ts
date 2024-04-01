import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LedgerBalanceListComponent } from './ledger-balance-list.component';

describe('LedgerBalanceListComponent', () => {
  let component: LedgerBalanceListComponent;
  let fixture: ComponentFixture<LedgerBalanceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LedgerBalanceListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LedgerBalanceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
