import { TestBed } from '@angular/core/testing';

import { CrudUserService } from './crud-user.service';

describe('CrudUserService', () => {
  let service: CrudUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
