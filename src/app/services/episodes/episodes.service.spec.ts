import { TestBed } from '@angular/core/testing';

import { EpisodesService } from './characters.service';

describe('EpisodesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EpisodesService = TestBed.get(EpisodesService);
    expect(service).toBeTruthy();
  });
});
