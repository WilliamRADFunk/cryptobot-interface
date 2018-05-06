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
      service.firstTime = [false, false, false, false];
      service.changeCurrencyType('LTC-USD', 'live-view', true);
      expect(service.currency).toBe('LTC-USD');
      expect(service.basePath).toBe('live-view');
      expect(service.refreshData).toHaveBeenCalled();
    }));
  });
  describe('changeEndDateTime', () => {
    it('should change end DateTime and call refreshData',
      inject([GdaxDataService], (service: GdaxDataService) => {
      spyOn(service, 'refreshData').and.returnValue(true);
      service.firstTime = [false, false, false, false];
      service.changeEndDateTime(date, true);
      expect(service.endDate).toEqual(date);
      expect(service.refreshData).toHaveBeenCalled();
    }));
  });
  describe('changeStartDateTime', () => {
    it('should change start DateTime and call refreshData',
      inject([GdaxDataService], (service: GdaxDataService) => {
      spyOn(service, 'refreshData').and.returnValue(true);
      service.firstTime = [false, false, false, false];
      service.changeStartDateTime(date, true);
      expect(service.startDate).toEqual(date);
      expect(service.refreshData).toHaveBeenCalled();
    }));
  });
  describe('changeTimeInterval', () => {
    it('should change interval to 300 and call refreshData',
      inject([GdaxDataService], (service: GdaxDataService) => {
      spyOn(service, 'refreshData').and.returnValue(true);
      service.firstTime = [false, false, false, false];
      service.changeTimeInterval(300, true);
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
      spyOn(service, 'filterByDate').and.returnValue([{'created_at': date, 'id': 321}]);
      spyOn(service, 'formatProduct').and.returnValue([{'created_at': date, 'id': 321}]);
      service.startDate = date;
      service.endDate = date;
      service.getLatestGdaxHistoryData();
      expect(service.formatProduct['calls'].count()).toEqual(1);
      expect(httpClient.get.calls.mostRecent().args[0].indexOf('/history/btc') > -1).toBe(true);
      expect(httpClient.get.calls.mostRecent().args[1].params.toString())
        .toEqual('limit=11');
    }));
    // it('should callhttpClient.get with expected parameters',
    //   inject([GdaxDataService], (service: GdaxDataService) => {
    //   spyOn(httpClient, 'get').and.returnValue(subscribeReturn2);
    //   spyOn(service, 'filterByDate').and.returnValue([{'created_at': date, 'id': 123}]);
    //   spyOn(service, 'formatProduct').and.returnValue([{'created_at': date, 'id': 123}]);
    //   service.bookmark = 123;
    //   service.startDate = date;
    //   service.endDate = date;
    //   service.currency = 'ALL';
    //   service.getLatestGdaxHistoryData();
    //   expect(service.formatProduct['calls'].count()).toEqual(1);
    //   expect(httpClient.get.calls.mostRecent().args[0].indexOf('/history/eth') > -1).toBe(true);
    //   expect(httpClient.get.calls.mostRecent().args[1].params.toString())
    //     .toEqual('after=123&limit=11');
    // }));
    // it('should callhttpClient.get with expected parameters',
    //   inject([GdaxDataService], (service: GdaxDataService) => {
    //   spyOn(httpClient, 'get').and.returnValue(subscribeReturn2);
    //   spyOn(service, 'filterByDate').and.returnValue([{'created_at': date, 'id': 321}]);
    //   spyOn(service, 'formatProduct').and.returnValue([{'created_at': date, 'id': 321}]);
    //   service.bookmark = -321;
    //   service.startDate = date;
    //   service.endDate = date;
    //   service.currency = 'ALL';
    //   service.getLatestGdaxHistoryData();
    //   expect(service.formatProduct['calls'].count()).toEqual(3);
    //   expect(httpClient.get.calls.mostRecent().args[0].indexOf('/history/eth') > -1).toBe(true);
    //   expect(httpClient.get.calls.mostRecent().args[1].params.toString())
    //     .toEqual('before=321&limit=11');
    // }));
    // it('should callhttpClient.get with expected parameters',
    //   inject([GdaxDataService], (service: GdaxDataService) => {
    //   spyOn(httpClient, 'get').and.returnValue(subscribeReturn2);
    //   spyOn(service, 'filterByDate').and.returnValue([{'created_at': date, 'id': 321}]);
    //   spyOn(service, 'formatProduct').and.returnValue([]);
    //   service.bookmark = 321;
    //   service.startDate = date;
    //   service.endDate = date;
    //   service.currency = 'BTC';
    //   service.getLatestGdaxHistoryData();
    //   expect(service.formatProduct['calls'].count()).toEqual(1);
    //   expect(httpClient.get.calls.mostRecent().args[0].indexOf('/history/btc') > -1).toBe(true);
    //   expect(httpClient.get.calls.mostRecent().args[1].params.toString())
    //     .toEqual('after=321&limit=11');
    //     expect(service.bookmark).toBe(321);
    // }));
    // it('should callhttpClient.get with expected parameters',
    //   inject([GdaxDataService], (service: GdaxDataService) => {
    //   spyOn(httpClient, 'get').and.returnValue(subscribeReturn2);
    //   spyOn(service, 'filterByDate').and.returnValue([{'created_at': date, 'id': 321}]);
    //   spyOn(service, 'formatProduct').and.returnValues(
    //     [{'created_at': date, 'id': 321}],
    //     [{'created_at': date, 'id': 321}]
    //   );
    //   service.rowsPerPage = 1;
    //   service.bookmark = 321;
    //   service.startDate = date;
    //   service.endDate = date;
    //   service.currency = 'ALL';
    //   service.getLatestGdaxHistoryData();
    //   expect(service.formatProduct['calls'].count()).toEqual(2);
    //   expect(httpClient.get.calls.mostRecent().args[0].indexOf('/history/ltc') > -1).toBe(true);
    //   expect(httpClient.get.calls.mostRecent().args[1].params.toString())
    //     .toEqual('after=321&limit=2');
    // }));
    // it('should callhttpClient.get with expected parameters',
    //   inject([GdaxDataService], (service: GdaxDataService) => {
    //   spyOn(httpClient, 'get').and.returnValue(subscribeReturn2);
    //   spyOn(service, 'filterByDate').and.returnValue([{'created_at': date, 'id': 321}]);
    //   spyOn(service, 'formatProduct').and.returnValue([{'created_at': date, 'id': 321}]);
    //   service.rowsPerPage = 0;
    //   service.bookmark = 321;
    //   service.startDate = date;
    //   service.endDate = date;
    //   service.currency = 'ALL';
    //   service.getLatestGdaxHistoryData();
    //   expect(service.formatProduct['calls'].count()).toEqual(1);
    //   expect(httpClient.get.calls.mostRecent().args[0].indexOf('/history/btc') > -1).toBe(true);
    //   expect(httpClient.get.calls.mostRecent().args[1].params.toString())
    //     .toEqual('after=321&limit=1');
    // }));
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
    it('should set page, make bookmark last table item, and call refreshData',
      inject([GdaxDataService], (service: GdaxDataService) => {
      spyOn(service, 'refreshData').and.returnValue(true);
      service.tableData.next([{'id': 321}, {'id': 123}]);
      service.changePageNumber(2);
      expect(service.page.value).toBe(2);
      expect(service.bookmark).toBe(321);
      expect(service.refreshData).toHaveBeenCalled();
    }));
    it('should set bookmark to undefined',
      inject([GdaxDataService], (service: GdaxDataService) => {
      spyOn(service, 'refreshData').and.returnValue(true);
      service.tableData.next([{'id': 321}, {'id': 123}]);
      service.changePageNumber(1);
      expect(service.page.value).toBe(1);
      expect(service.bookmark).toBe(undefined);
      expect(service.refreshData).toHaveBeenCalled();
    }));
    it('should set bookmark to table first item',
      inject([GdaxDataService], (service: GdaxDataService) => {
      spyOn(service, 'refreshData').and.returnValue(true);
      service.tableData.next([{'id': 321, 'product': 'btc'}, {'id': 123, 'product': 'btc'}]);
      service.page.next(4);
      service.changePageNumber(3);
      expect(service.page.value).toBe(3);
      expect(service.bookmark).toBe(-321);
      expect(service.refreshData).toHaveBeenCalled();
    }));
  });
  describe('changeRowsPerPage', () => {
    it('should set rowsPerPage and call refreshData',
      inject([GdaxDataService], (service: GdaxDataService) => {
      spyOn(service, 'refreshData').and.returnValue(true);
      service.firstTime = [false, false, false, false];
      service.tableData.next([{'id': 321}]);
      service.changeRowsPerPage(10, true);
      expect(service.rowsPerPage).toBe(10);
      expect(service.refreshData).toHaveBeenCalled();
    }));
  });
  describe('formatProduct', () => {
    it('should return empty array',
      inject([GdaxDataService], (service: GdaxDataService) => {
      expect(service.formatProduct([{}])).toEqual([{product: 'USD'}]);
    }));
    it('should return empty array',
      inject([GdaxDataService], (service: GdaxDataService) => {
      expect(service.formatProduct([{'details': 'nerple'}])).toEqual([{
        details: 'nerple',
        product: 'USD'
      }]);
    }));
    it('should return empty array',
      inject([GdaxDataService], (service: GdaxDataService) => {
      expect(service.formatProduct([{'details': {'product_id': 'derple'}}])).toEqual([{
        details: {
          'product_id': 'derple'
        },
        product: 'USD'
      }]);
    }));
    it('should return array with "product": "BTC"',
      inject([GdaxDataService], (service: GdaxDataService) => {
      expect(service.formatProduct([{'details': {'product_id': 'LTC-USD'}}])).toEqual([{
        details: {
          'product_id': 'LTC-USD'
        },
        product: 'LTC'
      }]);
    }));
    it('should return array with "type": "deposit"',
      inject([GdaxDataService], (service: GdaxDataService) => {
      expect(service.formatProduct([{
        'details': {
          'transfer_type': 'deposit'
        },
        'type': 'transfer'
      }])).toEqual([{
        details: {
          'transfer_type': 'deposit'
        },
        product: 'USD',
        type: 'deposit'
      }]);
    }));
  });
  describe('filterByDate', () => {
    it('should return array of only the one good value',
      inject([GdaxDataService], (service: GdaxDataService) => {
        const badDate = new Date(service.endDate.getTime() + 86000000);
        const goodDate = new Date(service.endDate.getTime() - 86000000);
      expect(service.filterByDate([
        {'created_at': badDate},
        {'created_at': goodDate},
        {'no_date': goodDate}
      ])).toEqual([{'created_at': goodDate}]);
    }));
    it('should return empty array',
      inject([GdaxDataService], (service: GdaxDataService) => {
      expect(service.filterByDate(null)).toEqual([]);
    }));
  });
});
