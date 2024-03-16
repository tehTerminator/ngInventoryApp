import { TestBed } from '@angular/core/testing';

import { BundleStoreService } from './bundle-store.service';

describe('BundleStoreService', () => {
  let service: BundleStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BundleStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
