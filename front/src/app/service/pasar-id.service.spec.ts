import { TestBed } from '@angular/core/testing';

import { PasarIdService } from './pasar-id.service';

describe('PasarIdService', () => {
  let service: PasarIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasarIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
