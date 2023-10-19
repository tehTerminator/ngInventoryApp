import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGroupsTableComponent } from './list-groups-table.component';

describe('ListGroupsTableComponent', () => {
  let component: ListGroupsTableComponent;
  let fixture: ComponentFixture<ListGroupsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListGroupsTableComponent]
    });
    fixture = TestBed.createComponent(ListGroupsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
