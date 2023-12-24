import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByUserComponent } from './search-by-user.component';

describe('SearchByUserComponent', () => {
  let component: SearchByUserComponent;
  let fixture: ComponentFixture<SearchByUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchByUserComponent]
    });
    fixture = TestBed.createComponent(SearchByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
