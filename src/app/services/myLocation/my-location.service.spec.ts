import { TestBed } from '@angular/core/testing';

import { MyLocationService } from './my-location.service';

describe('MyLocationService', () => {
  let service: MyLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
