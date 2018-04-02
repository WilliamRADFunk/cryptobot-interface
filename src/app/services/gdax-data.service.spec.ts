import { TestBed, inject } from '@angular/core/testing';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { GdaxDataService } from './gdax-data.service';

const date = new Date('2018-03-25T03:55:19.336Z');
const subscribeReturn1 = {
  subscribe: (fn) => {
    fn([[1, 2, 3, 4, 5, 6]]);
  }
};
const subscribeReturn2 = {
  subscribe: (fn) => {
    fn([
      {id: 'nobody'},
      {id: 'bob', 'details': {'product_id': 'BTC-USD'}},
      {id: 'nerple', 'details': {'product_id': 'LTC-USD'}},
      {id: 'derple', 'details': {'product_id': 'ETH-USD'}}
    ]);
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
              return subscribeReturn1;
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
    it('should change currency to LTC-USD, basePath to live-view, and call refreshData',
      inject([GdaxDataService], (service: GdaxDataService) => {
      spyOn(service, 'refreshData').and.returnValue(true);
      service.changeCurrencyType('LTC-USD', 'live-view');
      expect(service.currency).toBe('LTC-USD');
      expect(service.basePath).toBe('live-view');
      expect(service.refreshData).toHaveBeenCalled();
    }));
  });
  describe('changeEndDateTime', () => {
    it('should change end DateTime and call refreshData',
      inject([GdaxDataService], (service: GdaxDataService) => {
        spyOn(service, 'refreshData').and.returnValue(true);
      service.changeEndDateTime(date);
      expect(service.endDate).toEqual(date);
      expect(service.refreshData).toHaveBeenCalled();
    }));
  });
  describe('changeStartDateTime', () => {
    it('should change start DateTime and call refreshData',
      inject([GdaxDataService], (service: GdaxDataService) => {
        spyOn(service, 'refreshData').and.returnValue(true);
      service.changeStartDateTime(date);
      expect(service.startDate).toEqual(date);
      expect(service.refreshData).toHaveBeenCalled();
    }));
  });
  describe('changeTimeInterval', () => {
    it('should change interval to 300 and call refreshData',
      inject([GdaxDataService], (service: GdaxDataService) => {
        spyOn(service, 'refreshData').and.returnValue(true);
      service.changeTimeInterval(300);
      expect(service.interval).toBe(300);
      expect(service.refreshData).toHaveBeenCalled();
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
  describe('getLatestGdaxHistoryData', () => {
    it('should callhttpClient.get with expected parameters',
      inject([GdaxDataService], (service: GdaxDataService) => {
      spyOn(httpClient, 'get').and.returnValue(subscribeReturn2);
      service.startDate = date;
      service.endDate = date;
      service.getLatestGdaxHistoryData();
      expect(httpClient.get.calls.mostRecent().args[0].indexOf('/history/btc') > -1).toBe(true);
      expect(httpClient.get.calls.mostRecent().args[1].params.toString())
        .toEqual('start=2018-03-25T03:55:19.336Z&end=2018-03-25T03:55:19.336Z');
    }));
    it('should callhttpClient.get with expected parameters',
      inject([GdaxDataService], (service: GdaxDataService) => {
      spyOn(httpClient, 'get').and.returnValue(subscribeReturn2);
      service.startDate = date;
      service.endDate = date;
      service.currency = 'ALL';
      service.getLatestGdaxHistoryData();
      expect(httpClient.get.calls.mostRecent().args[0].indexOf('/history/eth') > -1).toBe(true);
      expect(httpClient.get.calls.mostRecent().args[1].params.toString())
        .toEqual('start=2018-03-25T03:55:19.336Z&end=2018-03-25T03:55:19.336Z');
    }));
  });
  describe('refreshData', () => {
    let service;
    beforeEach(inject([GdaxDataService], (serv: GdaxDataService) => {
      service = serv;
      spyOn(service, 'getLatestGdaxData').and.returnValue(true);
      spyOn(service, 'getLatestGdaxHistoryData').and.returnValue(true);
      spyOn(service, 'getLatestGdaxProfitData').and.returnValue(true);
      spyOn(service, 'getLatestCryptoBotData').and.returnValue(true);
    }));
    it('should call getLatestGdaxData and change isRelevant', () => {
      service.basePath = 'live-view';
      service.isRelevant.next(false);
      service.refreshData();
      expect(service.getLatestGdaxData).toHaveBeenCalled();
      expect(service.getLatestGdaxHistoryData).not.toHaveBeenCalled();
      expect(service.getLatestGdaxProfitData).not.toHaveBeenCalled();
      expect(service.getLatestCryptoBotData).not.toHaveBeenCalled();
      expect(service.isRelevant.value).toBe(true);
    });
    it('should call getLatestGdaxHistoryData and change isRelevant', () => {
      service.basePath = 'trading-history';
      service.isRelevant.next(true);
      service.refreshData();
      expect(service.getLatestGdaxData).not.toHaveBeenCalled();
      expect(service.getLatestGdaxHistoryData).toHaveBeenCalled();
      expect(service.getLatestGdaxProfitData).not.toHaveBeenCalled();
      expect(service.getLatestCryptoBotData).not.toHaveBeenCalled();
      expect(service.isRelevant.value).toBe(false);
    });
    it('should call getLatestGdaxProfitData and change isRelevant', () => {
      service.basePath = 'profit-portfolio';
      service.isRelevant.next(true);
      service.refreshData();
      expect(service.getLatestGdaxData).not.toHaveBeenCalled();
      expect(service.getLatestGdaxHistoryData).not.toHaveBeenCalled();
      expect(service.getLatestGdaxProfitData).toHaveBeenCalled();
      expect(service.getLatestCryptoBotData).not.toHaveBeenCalled();
      expect(service.isRelevant.value).toBe(false);
    });
    it('should call getLatestCryptoBotData and change isRelevant', () => {
      service.basePath = 'cryptobot-controls';
      service.isRelevant.next(true);
      service.refreshData();
      expect(service.getLatestGdaxData).not.toHaveBeenCalled();
      expect(service.getLatestGdaxHistoryData).not.toHaveBeenCalled();
      expect(service.getLatestGdaxProfitData).not.toHaveBeenCalled();
      expect(service.getLatestCryptoBotData).toHaveBeenCalled();
      expect(service.isRelevant.value).toBe(false);
    });
    it('should call nothing and not change isRelevant', () => {
      service.basePath = 'other-place';
      service.isRelevant.next(true);
      service.refreshData();
      expect(service.getLatestGdaxData).not.toHaveBeenCalled();
      expect(service.getLatestGdaxHistoryData).not.toHaveBeenCalled();
      expect(service.getLatestGdaxProfitData).not.toHaveBeenCalled();
      expect(service.getLatestCryptoBotData).not.toHaveBeenCalled();
      expect(service.isRelevant.value).toBe(true);
    });
  });
  describe('getLatestGdaxProfitData', () => {
    it('should do nothing yet',
      inject([GdaxDataService], (service: GdaxDataService) => {
      service.getLatestGdaxProfitData();
      expect(true).toBeTruthy();
    }));
  });
  describe('getLatestCryptoBotData', () => {
    it('should do nothing yet',
      inject([GdaxDataService], (service: GdaxDataService) => {
      service.getLatestCryptoBotData();
      expect(true).toBeTruthy();
    }));
  });
  describe('changePageNumber', () => {
    it('should set page and call refreshData',
      inject([GdaxDataService], (service: GdaxDataService) => {
      spyOn(service, 'refreshData').and.returnValue(true);
      service.changePageNumber(2);
      expect(service.page).toBe(2);
      expect(service.refreshData).toHaveBeenCalled();
    }));
  });
  describe('changeRowsPerPage', () => {
    it('should set rowsPerPage and call refreshData',
      inject([GdaxDataService], (service: GdaxDataService) => {
      spyOn(service, 'refreshData').and.returnValue(true);
      service.changeRowsPerPage(10);
      expect(service.rowsPerPage).toBe(10);
      expect(service.refreshData).toHaveBeenCalled();
    }));
  });
});
