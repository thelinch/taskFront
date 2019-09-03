import { TestBed } from '@angular/core/testing';

import { CicleAcademicsService } from './cicle-academics.service';

describe('CicleAcademicsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CicleAcademicsService = TestBed.get(CicleAcademicsService);
    expect(service).toBeTruthy();
  });
});
