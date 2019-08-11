import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

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
      spyOn(service, '_refreshData').and.returnValue(true);
      service._firstTime = [false, false, false, false];
      service.changeCurrencyType('LTC-USD', 'live-view', true);
      expect(service._currency).toBe('LTC-USD');
      expect(service._basePath).toBe('live-view');
      expect(service._refreshData).toHaveBeenCalled();
    }));
    it('should change currency to LTC-USD, basePath to live-view, and call refreshData',
      inject([GdaxDataService], (service: GdaxDataService) => {
      spyOn(service, '_refreshData').and.returnValue(true);
      service._firstTime = [true, false, false, false];
      service.changeCurrencyType('LTC-USD', 'live-view', true);
      expect(service._currency).toBe('LTC-USD');
      expect(service._basePath).toBe('live-view');
      expect(service._refreshData).toHaveBeenCalled();
    }));
    it('should change currency to LTC-USD, basePath to live-view, and not call refreshData',
      inject([GdaxDataService], (service: GdaxDataService) => {
      spyOn(service, '_refreshData').and.returnValue(true);
      service._firstTime = [true, false, false, false];
      service.changeCurrencyType('LTC-USD', 'live-view', false);
      expect(service._currency).toBe('LTC-USD');
      expect(service._basePath).toBe('live-view');
      expect(service._refreshData).not.toHaveBeenCalled();
    }));
  });
  describe('changeEndDateTime', () => {
    it('should change end DateTime and call refreshData',
      inject([GdaxDataService], (service: GdaxDataService) => {
      spyOn(service, '_refreshData').and.returnValue(true);
      service._firstTime = [false, false, false, false];
      service.changeEndDateTime(date, true);
      expect(service._endDate).toEqual(date);
      expect(service._refreshData).toHaveBeenCalled();
    }));
    it('should change end DateTime and call refreshData',
      inject([GdaxDataService], (service: GdaxDataService) => {
      spyOn(service, '_refreshData').and.returnValue(true);
      service._firstTime = [false, false, false, true];
      service.changeEndDateTime(date, true);
      expect(service._endDate).toEqual(date);
      expect(service._refreshData).toHaveBeenCalled();
    }));
    it('should change end DateTime and not call refreshData',
      inject([GdaxDataService], (service: GdaxDataService) => {
      spyOn(service, '_refreshData').and.returnValue(true);
      service._firstTime = [false, false, false, true];
      service.changeEndDateTime(date, false);
      expect(service._endDate).toEqual(date);
      expect(service._refreshData).not.toHaveBeenCalled();
    }));
  });
  describe('changeStartDateTime', () => {
    it('should change start DateTime and call refreshData',
      inject([GdaxDataService], (service: GdaxDataService) => {
      spyOn(service, '_refreshData').and.returnValue(true);
      service._firstTime = [false, false, false, false];
      service.changeStartDateTime(date, true);
      expect(service._startDate).toEqual(date);
      expect(service._refreshData).toHaveBeenCalled();
    }));
    it('should change start DateTime and call refreshData',
      inject([GdaxDataService], (service: GdaxDataService) => {
      spyOn(service, '_refreshData').and.returnValue(true);
      service._firstTime = [false, false, true, false];
      service.changeStartDateTime(date, true);
      expect(service._startDate).toEqual(date);
      expect(service._refreshData).toHaveBeenCalled();
    }));
    it('should change start DateTime and not call refreshData',
      inject([GdaxDataService], (service: GdaxDataService) => {
      spyOn(service, '_refreshData').and.returnValue(true);
      service._firstTime = [false, false, true, false];
      service.changeStartDateTime(date, false);
      expect(service._startDate).toEqual(date);
      expect(service._refreshData).not.toHaveBeenCalled();
    }));
  });
  describe('changeTimeInterval', () => {
    it('should change interval to 300 and call refreshData',
      inject([GdaxDataService], (service: GdaxDataService) => {
      spyOn(service, '_refreshData').and.returnValue(true);
      service._firstTime = [false, false, false, false];
      service.changeTimeInterval(300, true);
      expect(service._interval).toBe(300);
      expect(service._refreshData).toHaveBeenCalled();
    }));
    it('should change interval to 300 and call refreshData',
      inject([GdaxDataService], (service: GdaxDataService) => {
      spyOn(service, '_refreshData').and.returnValue(true);
      service._firstTime = [false, true, false, false];
      service.changeTimeInterval(600, true);
      expect(service._interval).toBe(600);
      expect(service._refreshData).toHaveBeenCalled();
    }));
    it('should change interval to 300 and not call refreshData',
      inject([GdaxDataService], (service: GdaxDataService) => {
      spyOn(service, '_refreshData').and.returnValue(true);
      service._firstTime = [false, true, false, false];
      service.changeTimeInterval(900, false);
      expect(service._interval).toBe(900);
      expect(service._refreshData).not.toHaveBeenCalled();
    }));
  });
  describe('getLatestGdaxData', () => {
    it('should callhttpClient.get with expected parameters',
      fakeAsync(inject([GdaxDataService], (service: GdaxDataService) => {
      spyOn(httpClient, 'get').and.callThrough();
      service._startDate = date;
      service._endDate = date;
      service._getLatestGdaxData();
      tick(1001);
      expect(httpClient.get.calls.mostRecent().args[0]).toEqual('https://api.gdax.com/products/BTC-USD/candles');
      expect(httpClient.get.calls.mostRecent().args[1].params.toString())
        .toEqual('granularity=3600&start=2018-03-25T03:55:19.336Z&end=2018-03-25T03:55:19.336Z');
    })));
    it('should callhttpClient.get with expected parameters',
      fakeAsync(inject([GdaxDataService], (service: GdaxDataService) => {
      spyOn(httpClient, 'get').and.callThrough();
      service._startDate = date;
      service._endDate = date;
      service._currency = 'ALL';
      service._getLatestGdaxData();
      tick(1001);
      expect(httpClient.get.calls.mostRecent().args[0]).toEqual('https://api.gdax.com/products/ETH-USD/candles');
      expect(httpClient.get.calls.mostRecent().args[1].params.toString())
        .toEqual('granularity=3600&start=2018-03-25T03:55:19.336Z&end=2018-03-25T03:55:19.336Z');
    })));
  });
  describe('getLatestGdaxHistoryData', () => {
    it('should call httpClient.get with expected parameters',
      inject([GdaxDataService], (service: GdaxDataService) => {
      spyOn(httpClient, 'get').and.returnValue(subscribeReturn2);
      spyOn(service, '_handleHistoryResults').and.returnValue(true);
      service._bookmark = null;
      service._startDate = date;
      service._endDate = date;
      service._getLatestGdaxHistoryData();
      expect(httpClient.get.calls.mostRecent().args[0].indexOf('/history/btc') > -1).toBe(true);
      expect(httpClient.get.calls.mostRecent().args[1].params.toString())
        .toEqual('limit=11');
    }));
    it('should call httpClient.get with expected parameters',
      inject([GdaxDataService], (service: GdaxDataService) => {
      spyOn(httpClient, 'get').and.returnValue(subscribeReturn2);
      spyOn(service, '_handleHistoryResults').and.returnValue(true);
      service._bookmark = 123;
      service._startDate = date;
      service._endDate = date;
      service._currIndex = 2;
      service._currency = 'ALL';
      service._getLatestGdaxHistoryData();
      expect(httpClient.get.calls.mostRecent().args[0].indexOf('/history/eth') > -1).toBe(true);
      expect(httpClient.get.calls.mostRecent().args[1].params.toString())
        .toEqual('after=123&limit=11');
    }));
    it('should callhttpClient.get with expected parameters',
      inject([GdaxDataService], (service: GdaxDataService) => {
      spyOn(httpClient, 'get').and.returnValue(subscribeReturn2);
      spyOn(service, '_handleHistoryResults').and.returnValue(true);
      service._bookmark = -321;
      service._startDate = date;
      service._endDate = date;
      service._currIndex = 2;
      service._currency = 'ALL';
      service._getLatestGdaxHistoryData();
      expect(httpClient.get.calls.mostRecent().args[0].indexOf('/history/eth') > -1).toBe(true);
      expect(httpClient.get.calls.mostRecent().args[1].params.toString())
        .toEqual('before=321&limit=11');
    }));
  });
  describe('refreshData', () => {
    let service;
    beforeEach(inject([GdaxDataService], (serv: GdaxDataService) => {
      service = serv;
      spyOn(service, 'getLatestGdaxData').and.returnValue(true);
      spyOn(service, 'getLatestGdaxHistoryData').and.returnValue(true);
      spyOn(service, 'getLatestGdaxUSDData').and.returnValue(true);
      spyOn(service, 'getLatestGdaxProfitData').and.returnValue(true);
      spyOn(service, 'getLatestCryptoBotData').and.returnValue(true);
    }));
    it('should call getLatestGdaxData and change isRelevant', () => {
      service._basePath = 'live-view';
      service._isRelevantBSubject.next(false);
      service._refreshData();
      expect(service._getLatestGdaxData).toHaveBeenCalled();
      expect(service._getLatestGdaxHistoryData).not.toHaveBeenCalled();
      expect(service._getLatestGdaxProfitData).not.toHaveBeenCalled();
      expect(service._getLatestCryptoBotData).not.toHaveBeenCalled();
      expect(service._isRelevantBSubject.value).toBe(true);
    });
    it('should call getLatestGdaxHistoryData and change isRelevant', () => {
      service._basePath = 'trading-history';
      service._isRelevantBSubject.next(true);
      service._refreshData();
      expect(service._getLatestGdaxData).not.toHaveBeenCalled();
      expect(service._getLatestGdaxHistoryData).toHaveBeenCalled();
      expect(service._getLatestGdaxProfitData).not.toHaveBeenCalled();
      expect(service._getLatestCryptoBotData).not.toHaveBeenCalled();
      expect(service._isRelevantBSubject.value).toBe(false);
    });
    it('should call getLatestGdaxHistoryData, change isRelevant, and currIndex', () => {
      service._basePath = 'trading-history';
      service._isRelevantBSubject.next(true);
      service._currIndex = 1;
      service._refreshData(true);
      expect(service._getLatestGdaxData).not.toHaveBeenCalled();
      expect(service._getLatestGdaxHistoryData).toHaveBeenCalled();
      expect(service._getLatestGdaxProfitData).not.toHaveBeenCalled();
      expect(service._getLatestCryptoBotData).not.toHaveBeenCalled();
      expect(service._isRelevantBSubject.value).toBe(false);
      expect(service._currIndex).toBe(1);
    });
    it('should call getLatestGdaxProfitData and change isRelevant', () => {
      service._basePath = 'profit-portfolio';
      service._isRelevantBSubject.next(true);
      service._refreshData();
      expect(service._getLatestGdaxData).not.toHaveBeenCalled();
      expect(service._getLatestGdaxHistoryData).not.toHaveBeenCalled();
      expect(service.getLatestGdaxUSDData).toHaveBeenCalled();
      expect(service._getLatestCryptoBotData).not.toHaveBeenCalled();
      expect(service._isRelevantBSubject.value).toBe(false);
    });
    it('should call getLatestCryptoBotData and change isRelevant', () => {
      service._basePath = 'cryptobot-controls';
      service._isRelevantBSubject.next(true);
      service._refreshData();
      expect(service._getLatestGdaxData).not.toHaveBeenCalled();
      expect(service._getLatestGdaxHistoryData).not.toHaveBeenCalled();
      expect(service._getLatestGdaxProfitData).not.toHaveBeenCalled();
      expect(service._getLatestCryptoBotData).toHaveBeenCalled();
      expect(service._isRelevantBSubject.value).toBe(false);
    });
    it('should call nothing and not change isRelevant', () => {
      service._basePath = 'other-place';
      service._isRelevantBSubject.next(true);
      service._refreshData();
      expect(service._getLatestGdaxData).not.toHaveBeenCalled();
      expect(service._getLatestGdaxHistoryData).not.toHaveBeenCalled();
      expect(service._getLatestGdaxProfitData).not.toHaveBeenCalled();
      expect(service._getLatestCryptoBotData).not.toHaveBeenCalled();
      expect(service._isRelevantBSubject.value).toBe(true);
    });
  });
  describe('getLatestGdaxProfitData', () => {
    it('should do nothing yet',
      inject([GdaxDataService], (service: GdaxDataService) => {
      service._getLatestGdaxProfitData();
      expect(true).toBeTruthy();
    }));
  });
  describe('getLatestCryptoBotData', () => {
    it('should do nothing yet',
      inject([GdaxDataService], (service: GdaxDataService) => {
      service._getLatestCryptoBotData();
      expect(true).toBeTruthy();
    }));
  });
  describe('changePageNumber', () => {
    it('should set page, make bookmark last table item, and call refreshData',
      inject([GdaxDataService], (service: GdaxDataService) => {
      spyOn(service, '_refreshData').and.returnValue(true);
      service._tableDataBSubject.next([{'id': 321}, {'id': 123}]);
      service.changePageNumber(2);
      expect(service._pageBSubject.value).toBe(2);
      expect(service._bookmark).toBe(321);
      expect(service._refreshData).toHaveBeenCalled();
    }));
    it('should set bookmark to undefined',
      inject([GdaxDataService], (service: GdaxDataService) => {
      spyOn(service, '_refreshData').and.returnValue(true);
      service._tableDataBSubject.next([{'id': 321}, {'id': 123}]);
      service.changePageNumber(1);
      expect(service._pageBSubject.value).toBe(1);
      expect(service._bookmark).toBe(null);
      expect(service._refreshData).toHaveBeenCalled();
    }));
    it('should set bookmark to table first item',
      inject([GdaxDataService], (service: GdaxDataService) => {
      spyOn(service, '_refreshData').and.returnValue(true);
      service._tableDataBSubject.next([{'id': 321, 'product': 'btc'}, {'id': 123, 'product': 'btc'}]);
      service._pageBSubject.next(4);
      service.changePageNumber(3);
      expect(service._pageBSubject.value).toBe(3);
      expect(service._bookmark).toBe(-321);
      expect(service._refreshData).toHaveBeenCalled();
    }));
  });
  describe('changeRowsPerPage', () => {
    it('should set rowsPerPage and call refreshData',
      inject([GdaxDataService], (service: GdaxDataService) => {
      spyOn(service, '_refreshData').and.returnValue(true);
      service._firstTime = [false, false, false, false];
      service._tableDataBSubject.next([{'id': 321}]);
      service.changeRowsPerPage(10, true);
      expect(service._rowsPerPage).toBe(10);
      expect(service._refreshData).toHaveBeenCalled();
    }));
    it('should set rowsPerPage and call refreshData',
      inject([GdaxDataService], (service: GdaxDataService) => {
      spyOn(service, '_refreshData').and.returnValue(true);
      service._firstTime = [true, false, false, false];
      service._tableDataBSubject.next([{'id': 321}]);
      service.changeRowsPerPage(10, true);
      expect(service._rowsPerPage).toBe(10);
      expect(service._refreshData).toHaveBeenCalled();
    }));
    it('should set rowsPerPage and not call refreshData',
      inject([GdaxDataService], (service: GdaxDataService) => {
      spyOn(service, '_refreshData').and.returnValue(true);
      service._firstTime = [true, false, false, false];
      service._tableDataBSubject.next([{'id': 321}]);
      service.changeRowsPerPage(10, false);
      expect(service._rowsPerPage).toBe(10);
      expect(service._refreshData).not.toHaveBeenCalled();
    }));
  });
  describe('_formatProduct', () => {
    it('should return empty array',
      inject([GdaxDataService], (service: GdaxDataService) => {
      expect(service._formatProduct([{}])).toEqual([{product: 'USD'}]);
    }));
    it('should return empty array',
      inject([GdaxDataService], (service: GdaxDataService) => {
      expect(service._formatProduct([{'details': 'nerple'}])).toEqual([{
        details: 'nerple',
        product: 'USD'
      }]);
    }));
    it('should return empty array',
      inject([GdaxDataService], (service: GdaxDataService) => {
      expect(service._formatProduct([{'details': {'product_id': 'derple'}}])).toEqual([{
        details: {
          'product_id': 'derple'
        },
        product: 'USD'
      }]);
    }));
    it('should return array with "product": "BTC"',
      inject([GdaxDataService], (service: GdaxDataService) => {
      expect(service._formatProduct([{'details': {'product_id': 'LTC-USD'}}])).toEqual([{
        details: {
          'product_id': 'LTC-USD'
        },
        product: 'LTC'
      }]);
    }));
    it('should return array with "type": "deposit"',
      inject([GdaxDataService], (service: GdaxDataService) => {
      expect(service._formatProduct([{
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
  describe('_filterByDate', () => {
    it('should return array of only the one good value',
      inject([GdaxDataService], (service: GdaxDataService) => {
        service._endDate = new Date();
        service._startDate = new Date(service._endDate.getTime() - 86000000);
        const badDate = new Date(service._endDate.getTime() + 86000000);
        const goodDate = new Date(service._endDate.getTime() - 86000000);
      expect(service._filterByDate([
        {'created_at': badDate},
        {'created_at': goodDate},
        {'no_date': goodDate}
      ])).toEqual([{'created_at': goodDate}]);
    }));
    it('should return empty array',
      inject([GdaxDataService], (service: GdaxDataService) => {
      expect(service._filterByDate(null)).toEqual([]);
    }));
  });
  describe('handleHistoryResults', () => {
    let service;
    beforeEach(inject([GdaxDataService], (serv: GdaxDataService) => {
      service = serv;
      spyOn(service, 'getLatestGdaxHistoryData').and.returnValue(true);
    }));
    it(`should call getLatestGdaxHistoryData,
      and make bookmark undefined`, fakeAsync(() => {
      service._currency = 'ALL';
      service._currIndex = 0;
      service._bookmark = 2;
      service._handleHistoryResults([]);
      tick(600);
      expect(service._getLatestGdaxHistoryData).toHaveBeenCalled();
      expect(service._bookmark).toBe(null);
      expect(service._currIndex).toBe(1);
    }));
    it(`should not call getLatestGdaxHistoryData, set tabelData,
      and make isBusy false`, fakeAsync(() => {
      service._currency = 'BTC';
      service._currIndex = 0;
      service._tableResults = [{name: 'doug'}];
      service._isBusyBSubject.next(true);
      service._handleHistoryResults([]);
      tick(600);
      expect(service._getLatestGdaxHistoryData).not.toHaveBeenCalled();
      expect(service._isBusyBSubject.value).toBe(false);
      expect(service._currIndex).toBe(0);
      expect(service._tableDataBSubject.value).toEqual([{name: 'doug'}]);
    }));
    it(`should not call getLatestGdaxHistoryData, set tabelData,
      make bookmark undefined, and make isBusy false`, fakeAsync(() => {
      service._currency = 'BTC';
      service._currIndex = 0;
      service._bookmark = 2;
      service._tableResults = [{name: 'doug'}];
      service._isBusyBSubject.next(true);
      service._endDate = new Date();
      service._startDate = new Date(service._endDate.getTime() - 86000000);
      service._handleHistoryResults([{'created_at': date}]);
      tick(600);
      expect(service._getLatestGdaxHistoryData).not.toHaveBeenCalled();
      expect(service._isBusyBSubject.value).toBe(false);
      expect(service._bookmark).toBe(null);
      expect(service._tableDataBSubject.value).toEqual([{name: 'doug'}]);
    }));
    it(`should call getLatestGdaxHistoryData, increase currIndex,
      and make bookmark undefined`, fakeAsync(() => {
      service._currency = 'ALL';
      service._currIndex = 0;
      service._bookmark = 2;
      service._tableResults = [{name: 'doug'}];
      service._tableDataBSubject.next([]);
      service._isBusyBSubject.next(true);
      service._endDate = new Date();
      service._startDate = new Date(service._endDate.getTime() - 86000000);
      service._handleHistoryResults([{'created_at': date}]);
      tick(600);
      expect(service._getLatestGdaxHistoryData).toHaveBeenCalled();
      expect(service._isBusyBSubject.value).toBe(true);
      expect(service._bookmark).toBe(null);
      expect(service._currIndex).toBe(1);
      expect(service._tableDataBSubject.value).toEqual([]);
    }));
    it(`should call getLatestGdaxHistoryData, increase currIndex,
      and make bookmark 4321`, fakeAsync(() => {
      spyOn(service, '_filterByDate').and.returnValue([]);
      service._currency = 'ALL';
      service._currIndex = 0;
      service._bookmark = 2;
      service._tableResults = [{name: 'doug'}];
      service._tableDataBSubject.next([]);
      service._isBusyBSubject.next(true);
      service._endDate = new Date();
      service._startDate = new Date(service._endDate.getTime() - 86000000);
      service._handleHistoryResults([{
        'created_at': new Date(),
        'id': 4321
      }]);
      tick(600);
      expect(service._getLatestGdaxHistoryData).toHaveBeenCalled();
      expect(service._isBusyBSubject.value).toBe(true);
      expect(service._bookmark).toBe(4321);
      expect(service._currIndex).toBe(0);
      expect(service._tableDataBSubject.value).toEqual([]);
    }));
    it(`should call getLatestGdaxHistoryData, set tabelData,
      increase currIndex, and make bookmark undefined`, fakeAsync(() => {
      const testDate = new Date();
      spyOn(service, '_filterByDate').and.returnValue([{
        'created_at': testDate,
        'id': 4321
      }]);
      spyOn(service, '_formatProduct').and.returnValue([{
        'created_at': testDate,
        'id': 4321
      }]);
      service._currency = 'ALL';
      service._currIndex = 0;
      service._bookmark = 2;
      service._tableResults = [];
      service._tableDataBSubject.next([]);
      service._isBusyBSubject.next(true);
      service._endDate = new Date();
      service._startDate = new Date(service._endDate.getTime() - 86000000);
      service._handleHistoryResults([{
        'created_at': testDate,
        'id': 4321
      }]);
      tick(600);
      expect(service._getLatestGdaxHistoryData).toHaveBeenCalled();
      expect(service._isBusyBSubject.value).toBe(true);
      expect(service._bookmark).toBe(null);
      expect(service._currIndex).toBe(1);
      expect(service._tableResults).toEqual([{
        'created_at': testDate,
        'id': 4321
      }]);
      expect(service._tableDataBSubject.value).toEqual([]);
    }));
    it(`should not call getLatestGdaxHistoryData, set tabelData,
      increase currIndex, and make bookmark 1234`, fakeAsync(() => {
      const testDate = new Date();
      spyOn(service, '_filterByDate').and.returnValue([{
        'created_at': testDate,
        'id': 4321
      }]);
      spyOn(service, '_formatProduct').and.returnValue([
        {
          'created_at': testDate,
          'id': 1234
        },
        {
          'created_at': testDate,
          'id': 4321
        }
      ]);
      service._currency = 'BTC';
      service._currIndex = 0;
      service._bookmark = 2;
      service._tableResults = [];
      service._tableDataBSubject.next([]);
      service._isBusyBSubject.next(true);
      service._endDate = new Date();
      service._startDate = new Date(service._endDate.getTime() - 86000000);
      service._handleHistoryResults([{
        'created_at': testDate,
        'id': 4321
      }]);
      tick(600);
      expect(service._getLatestGdaxHistoryData).not.toHaveBeenCalled();
      expect(service._isBusyBSubject.value).toBe(false);
      expect(service._bookmark).toBe(1234);
      expect(service._currIndex).toBe(0);
      expect(service._tableResults).toEqual([
        {
          'created_at': testDate,
          'id': 1234
        },
        {
          'created_at': testDate,
          'id': 4321
        }
      ]);
      expect(service._tableDataBSubject.value).toEqual([
        {
          'created_at': testDate,
          'id': 1234
        },
        {
          'created_at': testDate,
          'id': 4321
        }
      ]);
    }));
    it(`should call getLatestGdaxHistoryData, set tabelData,
      increase currIndex, and make bookmark undefined`, fakeAsync(() => {
      const testDate = new Date();
      spyOn(service, '_filterByDate').and.returnValue([{
        'created_at': testDate,
        'id': 4321
      }]);
      spyOn(service, '_formatProduct').and.returnValue([{
        'created_at': testDate,
        'id': 4321
      }]);
      service._currency = 'ALL';
      service._currIndex = 0;
      service._bookmark = 2;
      service._tableResults = [{
        'created_at': testDate,
        'id': 2222
      }];
      service._tableDataBSubject.next([]);
      service._isBusyBSubject.next(true);
      service._endDate = new Date();
      service._startDate = new Date(service._endDate.getTime() - 86000000);
      service._handleHistoryResults([{
        'created_at': testDate,
        'id': 4321
      }]);
      tick(600);
      expect(service._getLatestGdaxHistoryData).toHaveBeenCalled();
      expect(service._isBusyBSubject.value).toBe(true);
      expect(service._bookmark).toBe(null);
      expect(service._currIndex).toBe(1);
      expect(service._tableResults).toEqual([
        {
          'created_at': testDate,
          'id': 2222
        },
        {
          'created_at': testDate,
          'id': 4321
        }
      ]);
      expect(service._tableDataBSubject.value).toEqual([]);
    }));
    it(`should not call getLatestGdaxHistoryData, set tabelData,
      set tabelResults, and make bookmark 1234`, fakeAsync(() => {
      const testDate = new Date();
      spyOn(service, '_filterByDate').and.returnValue([{
        'created_at': testDate,
        'id': 4321
      }]);
      spyOn(service, '_formatProduct').and.returnValue([
        {
          'created_at': testDate,
          'id': 1234
        },
        {
          'created_at': testDate,
          'id': 4321
        }
      ]);
      service._currency = 'BTC';
      service._currIndex = 0;
      service._bookmark = 2;
      service._tableResults = [{
        'created_at': testDate,
        'id': 2222
      }];
      service._tableDataBSubject.next([]);
      service._isBusyBSubject.next(true);
      service._endDate = new Date();
      service._startDate = new Date(service._endDate.getTime() - 86000000);
      service._handleHistoryResults([{
        'created_at': testDate,
        'id': 4321
      }]);
      tick(600);
      expect(service._getLatestGdaxHistoryData).not.toHaveBeenCalled();
      expect(service._isBusyBSubject.value).toBe(false);
      expect(service._bookmark).toBe(1234);
      expect(service._currIndex).toBe(0);
      expect(service._tableResults).toEqual([
        {
          'created_at': testDate,
          'id': 2222
        },
        {
          'created_at': testDate,
          'id': 1234
        },
        {
          'created_at': testDate,
          'id': 4321
        }
      ]);
      expect(service._tableDataBSubject.value).toEqual([
        {
          'created_at': testDate,
          'id': 2222
        },
        {
          'created_at': testDate,
          'id': 1234
        },
        {
          'created_at': testDate,
          'id': 4321
        }
      ]);
    }));
    it(`should do nothing. Fall through`, fakeAsync(() => {
      const testDate = new Date();
      spyOn(service, '_filterByDate').and.returnValue([
        {
          'created_at': testDate,
          'id': 1234
        },
        {
          'created_at': testDate,
          'id': 4321
        }
      ]);
      spyOn(service, '_formatProduct').and.returnValue([
        {
          'created_at': testDate,
          'id': 1234
        },
        {
          'created_at': testDate,
          'id': 4321
        }
      ]);
      service.rowsPerPage = -1;
      service._currency = 'BTC';
      service._currIndex = 0;
      service._bookmark = 2;
      service._tableResults = [{
        'created_at': testDate,
        'id': 2222
      }];
      service._tableDataBSubject.next([]);
      service._isBusyBSubject.next(true);
      service._endDate = new Date();
      service._startDate = new Date(service._endDate.getTime() - 86000000);
      service._handleHistoryResults([{
        'created_at': testDate,
        'id': 4321
      }]);
      tick(600);
      expect(service._getLatestGdaxHistoryData).not.toHaveBeenCalled();
      expect(service._isBusyBSubject.value).toBe(true);
      expect(service._bookmark).toBe(2);
      expect(service._currIndex).toBe(0);
      expect(service._tableResults).toEqual([{
        'created_at': testDate,
        'id': 2222
      }]);
      expect(service._tableDataBSubject.value).toEqual([]);
    }));
    it(`should call getLatestGdaxHistoryData,
      set tabelResults, and make bookmark 4321`, fakeAsync(() => {
      const testDate = new Date();
      spyOn(service, '_filterByDate').and.returnValue([
        {
          'created_at': testDate,
          'id': 1234
        },
        {
          'created_at': testDate,
          'id': 4321
        }
      ]);
      spyOn(service, '_formatProduct').and.returnValue([
        {
          'created_at': testDate,
          'id': 1234
        },
        {
          'created_at': testDate,
          'id': 4321
        }
      ]);
      service._currency = 'BTC';
      service._currIndex = 0;
      service._bookmark = 2;
      service._tableResults = [];
      service._tableDataBSubject.next([]);
      service._isBusyBSubject.next(true);
      service._endDate = new Date();
      service._startDate = new Date(service._endDate.getTime() - 86000000);
      service._handleHistoryResults([{
        'created_at': testDate,
        'id': 4321
      }]);
      tick(600);
      expect(service._getLatestGdaxHistoryData).toHaveBeenCalled();
      expect(service._isBusyBSubject.value).toBe(true);
      expect(service._bookmark).toBe(4321);
      expect(service._currIndex).toBe(0);
      expect(service._tableResults).toEqual([
        {
          'created_at': testDate,
          'id': 1234
        },
        {
          'created_at': testDate,
          'id': 4321
        }
      ]);
      expect(service._tableDataBSubject.value).toEqual([]);
    }));
    it(`should not call getLatestGdaxHistoryData,
      set tabelResults, and make bookmark 1234`, fakeAsync(() => {
      const testDate = new Date();
      spyOn(service, '_filterByDate').and.returnValue([
        {
          'created_at': testDate,
          'id': 1234
        },
        {
          'created_at': testDate,
          'id': 4321
        }
      ]);
      spyOn(service, '_formatProduct').and.returnValue([
        {
          'created_at': testDate,
          'id': 1234
        },
        {
          'created_at': testDate,
          'id': 4321
        }
      ]);
      service._currency = 'BTC';
      service._currIndex = 0;
      service._bookmark = 2;
      service._tableResults = [
        {
          'created_at': testDate,
          'id': 1234
        },
        {
          'created_at': testDate,
          'id': 4321
        }
      ];
      service._tableDataBSubject.next([]);
      service._isBusyBSubject.next(true);
      service._endDate = new Date();
      service._startDate = new Date(service._endDate.getTime() - 86000000);
      service._handleHistoryResults([{
        'created_at': testDate,
        'id': 4321
      }]);
      tick(600);
      expect(service._getLatestGdaxHistoryData).not.toHaveBeenCalled();
      expect(service._isBusyBSubject.value).toBe(false);
      expect(service._bookmark).toBe(1234);
      expect(service._currIndex).toBe(0);
      expect(service._tableResults).toEqual([
        {
          'created_at': testDate,
          'id': 1234
        },
        {
          'created_at': testDate,
          'id': 4321
        },
        {
          'created_at': testDate,
          'id': 1234
        },
        {
          'created_at': testDate,
          'id': 4321
        }
      ]);
      expect(service._tableDataBSubject.value).toEqual([
        {
          'created_at': testDate,
          'id': 1234
        },
        {
          'created_at': testDate,
          'id': 4321
        },
        {
          'created_at': testDate,
          'id': 1234
        },
        {
          'created_at': testDate,
          'id': 4321
        }
      ]);
    }));
  });
});
