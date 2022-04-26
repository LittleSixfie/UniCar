import { TestBed } from '@angular/core/testing';

import { ShowViajeService } from './show-viaje-service.service';

describe('ShowViajeService', () => {
  let service: ShowViajeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowViajeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
