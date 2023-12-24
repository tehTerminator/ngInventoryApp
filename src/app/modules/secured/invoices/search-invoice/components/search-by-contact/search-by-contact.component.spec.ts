import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByContactComponent } from './search-by-contact.component';

describe('SearchByContactComponent', () => {
  let component: SearchByContactComponent;
  let fixture: ComponentFixture<SearchByContactComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchByContactComponent]
    });
    fixture = TestBed.createComponent(SearchByContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
