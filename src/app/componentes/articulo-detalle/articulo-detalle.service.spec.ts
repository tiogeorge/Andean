import { TestBed } from '@angular/core/testing';

import { ArticuloDetalleService } from './articulo-detalle.service';

describe('ArticuloDetalleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArticuloDetalleService = TestBed.get(ArticuloDetalleService);
    expect(service).toBeTruthy();
  });
});
