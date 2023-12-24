import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByDateComponent } from './search-by-date.component';

describe('SearchByDateComponent', () => {
  let component: SearchByDateComponent;
  let fixture: ComponentFixture<SearchByDateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchByDateComponent]
    });
    fixture = TestBed.createComponent(SearchByDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
