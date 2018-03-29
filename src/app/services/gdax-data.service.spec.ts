import { TestBed, inject } from '@angular/core/testing';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { GdaxDataService } from './gdax-data.service';

const date = new Date('2018-03-25T03:55:19.336Z');
const subscribeReturn = {
  subscribe: (fn) => {
    fn([[1, 2, 3, 4, 5, 6]]);
  }
};
let httpClient;

describe('GdaxDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: {
            get: (data) => {
              return subscribeReturn;
            },
          }
        },
        GdaxDataService
      ]
    });
    httpClient = TestBed.get(HttpClient);
  });

  it('should be created', inject([GdaxDataService], (service: GdaxDataService) => {
    expect(service).toBeTruthy();
  }));
  describe('changeCurrencyType', () => {
    it('should change currency to LTC-USD and call getLatestGdaxData',
      inject([GdaxDataService], (service: GdaxDataService) => {
      spyOn(service, 'getLatestGdaxData').and.returnValue(subscribeReturn);
      service.changeCurrencyType('LTC-USD');
      expect(service.currency).toBe('LTC-USD');
      expect(service.getLatestGdaxData).toHaveBeenCalled();
    }));
  });
  describe('changeEndDateTime', () => {
    it('should change end DateTime and call getLatestGdaxData',
      inject([GdaxDataService], (service: GdaxDataService) => {
      spyOn(service, 'getLatestGdaxData').and.returnValue(subscribeReturn);
      service.changeEndDateTime(date);
      expect(service.endDate).toEqual(date);
      expect(service.getLatestGdaxData).toHaveBeenCalled();
    }));
  });
  describe('changeStartDateTime', () => {
    it('should change start DateTime and call getLatestGdaxData',
      inject([GdaxDataService], (service: GdaxDataService) => {
      spyOn(service, 'getLatestGdaxData').and.returnValue(subscribeReturn);
      service.changeStartDateTime(date);
      expect(service.startDate).toEqual(date);
      expect(service.getLatestGdaxData).toHaveBeenCalled();
    }));
  });
  describe('changeTimeInterval', () => {
    it('should change interval to 300 and call getLatestGdaxData',
      inject([GdaxDataService], (service: GdaxDataService) => {
      spyOn(service, 'getLatestGdaxData').and.returnValue(subscribeReturn);
      service.changeTimeInterval(300);
      expect(service.interval).toBe(300);
      expect(service.getLatestGdaxData).toHaveBeenCalled();
    }));
  });
  describe('getLatestGdaxData', () => {
    it('should callhttpClient.get with expected parameters',
      inject([GdaxDataService], (service: GdaxDataService) => {
      spyOn(httpClient, 'get').and.callThrough();
      service.startDate = date;
      service.endDate = date;
      service.getLatestGdaxData();
      expect(httpClient.get.calls.mostRecent().args[0]).toEqual('https://api.gdax.com/products/BTC-USD/candles');
      expect(httpClient.get.calls.mostRecent().args[1].params.toString())
        .toEqual('granularity=3600&start=2018-03-25T03:55:19.336Z&end=2018-03-25T03:55:19.336Z');
    }));
    it('should callhttpClient.get with expected parameters',
      inject([GdaxDataService], (service: GdaxDataService) => {
      spyOn(httpClient, 'get').and.callThrough();
      service.startDate = date;
      service.endDate = date;
      service.currency = 'ALL';
      service.getLatestGdaxData();
      expect(httpClient.get.calls.mostRecent().args[0]).toEqual('https://api.gdax.com/products/ETH-USD/candles');
      expect(httpClient.get.calls.mostRecent().args[1].params.toString())
        .toEqual('granularity=3600&start=2018-03-25T03:55:19.336Z&end=2018-03-25T03:55:19.336Z');
    }));
  });
});
