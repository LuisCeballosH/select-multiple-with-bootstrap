import { TestBed } from '@angular/core/testing';

import { Select2Service } from './select2.service';

describe('Select2Service', () => {
  let service: Select2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Select2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
