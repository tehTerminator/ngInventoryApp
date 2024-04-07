import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationBtnComponent } from './navigation-btn.component';

describe('NavigationBtnComponent', () => {
  let component: NavigationBtnComponent;
  let fixture: ComponentFixture<NavigationBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavigationBtnComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
