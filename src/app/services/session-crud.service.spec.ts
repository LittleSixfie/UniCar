import { TestBed } from '@angular/core/testing';

import { SessionCrudService } from './session-crud.service';

describe('SessionCrudService', () => {
  let service: SessionCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
