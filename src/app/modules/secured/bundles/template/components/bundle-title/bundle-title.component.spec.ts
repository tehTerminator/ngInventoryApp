import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BundleTitleComponent } from './bundle-title.component';

describe('BundleTitleComponent', () => {
  let component: BundleTitleComponent;
  let fixture: ComponentFixture<BundleTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BundleTitleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BundleTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
