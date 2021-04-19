import { TestBed } from '@angular/core/testing';

import { EcoemprendedorService } from './ecoemprendedor.service';

describe('EcoemprendedorService', () => {
  let service: EcoemprendedorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EcoemprendedorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
