import { TestBed } from '@angular/core/testing';

import { Team3Service } from './team3.service';

describe('Team3Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Team3Service = TestBed.get(Team3Service);
    expect(service).toBeTruthy();
  });
});
