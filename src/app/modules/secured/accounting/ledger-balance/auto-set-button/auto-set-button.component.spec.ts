import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoSetButtonComponent } from './auto-set-button.component';

describe('AutoSetButtonComponent', () => {
  let component: AutoSetButtonComponent;
  let fixture: ComponentFixture<AutoSetButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutoSetButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AutoSetButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
