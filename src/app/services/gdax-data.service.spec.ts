import { TestBed, inject } from '@angular/core/testing';

import { GdaxDataService } from './gdax-data.service';

describe('GdaxDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GdaxDataService]
    });
  });

  // it('should be created', inject([GdaxDataService], (service: GdaxDataService) => {
  //   expect(service).toBeTruthy();
  // }));
});
