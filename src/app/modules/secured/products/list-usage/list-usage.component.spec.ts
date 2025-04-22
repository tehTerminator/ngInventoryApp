import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUsageComponent } from './list-usage.component';

describe('ListUsageComponent', () => {
  let component: ListUsageComponent;
  let fixture: ComponentFixture<ListUsageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListUsageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
