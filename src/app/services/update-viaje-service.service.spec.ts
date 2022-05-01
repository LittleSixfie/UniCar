import { TestBed } from '@angular/core/testing';

import { UpdateViajeServiceService } from './update-viaje-service.service';

describe('UpdateViajeServiceService', () => {
  let service: UpdateViajeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateViajeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
