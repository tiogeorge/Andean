import { TestBed } from '@angular/core/testing';

import { ValoracionService } from './valoracion.service';

describe('ValoracionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValoracionService = TestBed.get(ValoracionService);
    expect(service).toBeTruthy();
  });
});
