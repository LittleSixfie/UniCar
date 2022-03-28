import { TestBed } from '@angular/core/testing';

import { CRUDSesionService } from './crud-sesion.service';

describe('CRUDSesionService', () => {
  let service: CRUDSesionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CRUDSesionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
