import { TestBed } from '@angular/core/testing';

import { SproductsService } from './sproducts.service';

describe('SproductsService', () => {
  let service: SproductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SproductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
