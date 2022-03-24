import { TestBed } from '@angular/core/testing';

import { LicenseEditService } from './license-edit.service';

describe('LicenseEditService', () => {
  let service: LicenseEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LicenseEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
