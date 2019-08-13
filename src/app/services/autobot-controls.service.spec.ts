import { TestBed, inject } from '@angular/core/testing';

import { AutobotControlsService } from './autobot-controls.service';

describe('AutobotControlsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutobotControlsService]
    });
  });

  it('should be created', inject([AutobotControlsService], (service: AutobotControlsService) => {
    expect(service).toBeTruthy();
  }));
});
