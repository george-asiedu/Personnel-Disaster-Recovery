import { TestBed } from '@angular/core/testing';

import { EmergencyInitiativeService } from './emergency-initiative.service';

describe('EmergencyInitiativeService', () => {
  let service: EmergencyInitiativeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmergencyInitiativeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
