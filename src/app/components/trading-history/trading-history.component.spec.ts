import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartModule } from 'angular-highcharts';

import { TradingHistoryComponent } from './trading-history.component';
import { GdaxDataService } from '../../services/gdax-data.service';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

let gdaxDataService;

describe('TradingHistoryComponent', () => {
  let component: TradingHistoryComponent;
  let fixture: ComponentFixture<TradingHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbModule.forRoot(),
        ChartModule
      ],
      declarations: [ TradingHistoryComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {children: [{url: ['BTC-USD']}]},
            url: {
              subscribe: fn => {
                fn([{path: 'BTC-USD'}]);
              }
            },
            queryParamMap: Observable.of({
              get: (key) => {
                if (key === 'rows') {
                  return 10;
                }
              },
              has: (key) => {
                if (key === 'rows') {
                  return true;
                }
              }
            })
          }
        },
        {
          provide: Router,
          useClass: class { navigate: {} = jasmine.createSpy('navigate'); }
        },
        {
          provide: GdaxDataService,
          useValue: {
            changeCurrencyType: () => {},
            changePageNumber: () => {},
            changeRowsPerPage: () => {},
            isBusy: {
              subscribe: fn => {
                fn(true);
              }
            },
            page: {
              subscribe: fn => {
                fn(1);
              }
            },
            tableData: {
              subscribe: (fn) => {
                fn([1, 2, 3, 4, 5, 6]);
              }
            },
          }
        }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    });
    gdaxDataService = TestBed.get(GdaxDataService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradingHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('ngOnInit', () => {
    it('should call changeCurrencyType with false', () => {
      spyOn(gdaxDataService, 'changeCurrencyType').and.returnValue(true);
      spyOn(component, '_handleRowsPerPageParam').and.returnValue(true);
      component._firstTime[1] = true;
      component.ngOnInit();
      fixture.detectChanges();
      expect(gdaxDataService.changeCurrencyType).toHaveBeenCalledWith(
        component.pathState,
        'trading-history',
        false);
      expect(component._firstTime[0]).toBe(false);
    });
    it('should call changeCurrencyType with true', () => {
      spyOn(gdaxDataService, 'changeCurrencyType').and.returnValue(true);
      spyOn(component, '_handleRowsPerPageParam').and.returnValue(true);
      component._firstTime[1] = false;
      component.ngOnInit();
      fixture.detectChanges();
      expect(gdaxDataService.changeCurrencyType).toHaveBeenCalledWith(
        component.pathState,
        'trading-history',
        true);
      expect(component._firstTime[0]).toBe(false);
    });
    it('should call handleRowsPerPageParam and set firstTime[1] to false', () => {
      spyOn(gdaxDataService, 'changeCurrencyType').and.returnValue(true);
      spyOn(component, '_handleRowsPerPageParam').and.returnValue(true);
      component._firstTime[1] = true;
      component.ngOnInit();
      fixture.detectChanges();
      expect(component.handleRowsPerPageParam).toHaveBeenCalled();
      expect(component._firstTime[1]).toBe(false);
    });
    it('should set page to 1 and isNoPrevPage to true', () => {
      spyOn(gdaxDataService, 'changeCurrencyType').and.returnValue(true);
      spyOn(component, '_handleRowsPerPageParam').and.returnValue(true);
      component.isNoPrevPage = false;
      component.ngOnInit();
      fixture.detectChanges();
      expect(component.page).toBe(1);
      expect(component.isNoPrevPage).toBe(true);
    });
    it('should set page to 2 and isNoPrevPage to false', () => {
      spyOn(gdaxDataService, 'changeCurrencyType').and.returnValue(true);
      spyOn(component, '_handleRowsPerPageParam').and.returnValue(true);
      component.isNoPrevPage = true;
      gdaxDataService.page.subscribe = fn => {
        fn(2);
      };
      component.ngOnInit();
      fixture.detectChanges();
      expect(component.page).toBe(2);
      expect(component.isNoPrevPage).toBe(false);
    });
  });
  describe('changedPageNumber', () => {
    it('should not change page and not call gdaxDataService.changePageNumber', () => {
      spyOn(gdaxDataService, 'changePageNumber').and.returnValue(true);
      component.isNoNextPage = true;
      component.isNoPrevPage = true;
      component.page = 3;
      component.isBusy = false;
      component.changedPageNumber('prev');
      expect(component.page).toBe(3);
      expect(component.isBusy).toBe(false);
      expect(gdaxDataService.changePageNumber).not.toHaveBeenCalled();
    });
    it('should not change page and not call gdaxDataService.changePageNumber', () => {
      spyOn(gdaxDataService, 'changePageNumber').and.returnValue(true);
      component.isNoNextPage = false;
      component.isNoPrevPage = false;
      component.page = 1;
      component.isBusy = false;
      component.changedPageNumber('bob');
      expect(component.page).toBe(1);
      expect(component.isBusy).toBe(false);
      expect(gdaxDataService.changePageNumber).not.toHaveBeenCalled();
    });
    it('should change page and call gdaxDataService.changePageNumber', () => {
      spyOn(gdaxDataService, 'changePageNumber').and.returnValue(true);
      component.isNoNextPage = true;
      component.isNoPrevPage = false;
      component.page = 2;
      component.isBusy = false;
      component.changedPageNumber('prev');
      expect(component.page).toBe(1);
      expect(component.isBusy).toBe(true);
      expect(gdaxDataService.changePageNumber).toHaveBeenCalled();
    });
    it('should change page and call gdaxDataService.changePageNumber', () => {
      spyOn(gdaxDataService, 'changePageNumber').and.returnValue(true);
      component.isNoNextPage = false;
      component.isNoPrevPage = true;
      component.page = 2;
      component.isBusy = false;
      component.changedPageNumber('next');
      expect(component.page).toBe(3);
      expect(component.isBusy).toBe(true);
      expect(gdaxDataService.changePageNumber).toHaveBeenCalled();
    });
  });
  describe('changedRowsPerPage', () => {
    it('should not change rowsPerPage and not call gdaxDataService.changeRowsPerPage', () => {
      spyOn(gdaxDataService, 'changeRowsPerPage').and.returnValue(true);
      component.rowsPerPage = 100;
      component.isBusy = false;
      component.changedRowsPerPage(100);
      expect(component.rowsPerPage).toBe(100);
      expect(component.isBusy).toBe(false);
      expect(gdaxDataService.changeRowsPerPage).not.toHaveBeenCalled();
    });
    it('should change rowsPerPage and call gdaxDataService.changeRowsPerPage', () => {
      spyOn(gdaxDataService, 'changeRowsPerPage').and.returnValue(true);
      component.rowsPerPage = 100;
      component.isBusy = false;
      component.changedRowsPerPage(25);
      expect(component.rowsPerPage).toBe(25);
      expect(component.isBusy).toBe(true);
      expect(gdaxDataService.changeRowsPerPage).toHaveBeenCalled();
    });
  });
  describe('_handleRowsPerPageParam', () => {
    it(`should set rowsPerPage to 10.
      Call updateParams & then changeCurrencyType with 10, false`, () => {
      spyOn(component, '_updateParams').and.returnValue(true);
      spyOn(gdaxDataService, 'changeRowsPerPage').and.returnValue(true);
      component._params = {
        get: (key) => {
          if (key === 'bob') {
            return '25';
          }
        },
        has: (key) => {
          if (key === 'bob') {
            return true;
          }
        },
        getAll: () => [''],
        keys: ['']
      };
      component.rowsPerPage = 200;
      component._firstTime[0] = false;
      component.handleRowsPerPageParam();
      expect(component.updateParams).toHaveBeenCalled();
      expect(gdaxDataService.changeRowsPerPage).toHaveBeenCalledWith(10, true);
      expect(component.rowsPerPage).toBe(10);
    });
    it(`should set rowsPerPage to 25.
      Call updateParams & then changeCurrencyType with 25, true`, () => {
      spyOn(component, '_updateParams').and.returnValue(true);
      spyOn(gdaxDataService, 'changeRowsPerPage').and.returnValue(true);
      component._params = {
        get: (key) => {
          if (key === 'rows') {
            return '25';
          }
        },
        has: (key) => {
          if (key === 'rows') {
            return true;
          }
        },
        getAll: () => [''],
        keys: ['']
      };
      component.rowsPerPage = 200;
      component._firstTime[0] = true;
      component.handleRowsPerPageParam();
      expect(component.updateParams).toHaveBeenCalled();
      expect(gdaxDataService.changeRowsPerPage).toHaveBeenCalledWith(25, false);
      expect(component.rowsPerPage).toBe(25);
    });
  });
  describe('updateTable', () => {
    it('should leave table empty and tableReady to true', () => {
      component.tableReady = false;
      component.table = undefined;
      component._updateTable([]);
      expect(component.tableReady).toBe(true);
      expect(component.table).toEqual([]);
    });
    it('should add row to table and tableReady to true', () => {
      spyOn(gdaxDataService, 'changeRowsPerPage').and.returnValue(true);
      const date = new Date();
      const dateOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
      const dateStr = new Date(date).toLocaleString('en-US', dateOptions);
      component.tableReady = false;
      component.table = undefined;
      component._updateTable([{
        'id': 'bob',
        'created_at': date,
        'product': 'BTC-USD',
        'amount': -10000,
        'type': 'match',
        'balance': 60000
      }]);
      expect(component.tableReady).toBe(true);
      expect(component.table).toEqual([{
        'id': 'bob',
        'date': dateStr,
        'product': 'BTC-USD',
        'amount': 10000,
        'buysell': 'sell',
        'type': 'match',
        'balance': 60000
      }]);
      expect(component.isNoNextPage).toBe(true);
    });
    it('should add row to table and tableReady to true', () => {
      spyOn(gdaxDataService, 'changeRowsPerPage').and.returnValue(true);
      const date = new Date();
      const dateOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      };
      const dateStr = new Date(date).toLocaleString('en-US', dateOptions);
      component.tableReady = false;
      component.table = undefined;
      component._updateTable([{
        'id': 'bob',
        'created_at': date,
        'product': 'BTC-USD',
        'amount': 10000,
        'type': 'deposit',
        'balance': 60000
      }]);
      expect(component.tableReady).toBe(true);
      expect(component.table).toEqual([{
        'id': 'bob',
        'date': dateStr,
        'product': 'BTC-USD',
        'amount': 10000,
        'buysell': '-',
        'type': 'deposit',
        'balance': 60000
      }]);
      expect(component.isNoNextPage).toBe(true);
    });
    it('should add row to table and tableReady to true', () => {
      spyOn(gdaxDataService, 'changeRowsPerPage').and.returnValue(true);
      const date = new Date();
      const dateOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      };
      const dateStr = new Date(date).toLocaleString('en-US', dateOptions);
      component.tableReady = false;
      component.table = undefined;
      component._updateTable([{
        'id': 'bob',
        'created_at': date,
        'product': 'BTC-USD',
        'amount': 10000,
        'type': 'match',
        'balance': 60000
      }]);
      expect(component.tableReady).toBe(true);
      expect(component.table).toEqual([{
        'id': 'bob',
        'date': dateStr,
        'product': 'BTC-USD',
        'amount': 10000,
        'buysell': 'buy',
        'type': 'match',
        'balance': 60000
      }]);
      expect(component.isNoNextPage).toBe(true);
    });
    it('should add row to table and tableReady to true', () => {
      spyOn(gdaxDataService, 'changeRowsPerPage').and.returnValue(true);
      const date = new Date();
      const dateOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      };
      const dateStr = new Date(date).toLocaleString('en-US', dateOptions);
      component.tableReady = false;
      component.table = undefined;
      component.rowsPerPage = 1;
      component._updateTable([
        {
        'id': 'bob',
        'created_at': date,
        'product': 'BTC-USD',
        'amount': 10000,
        'type': 'match',
        'balance': 60000
        },
        {
          'id': 'nerps',
          'created_at': date,
          'product': 'BTC-USD',
          'amount': 10000,
          'type': 'match',
          'balance': 60000
        }
      ]);
      expect(component.tableReady).toBe(true);
      expect(component.table).toEqual([
        {
        'id': 'bob',
        'date': dateStr,
        'product': 'BTC-USD',
        'amount': 10000,
        'buysell': 'buy',
        'type': 'match',
        'balance': 60000
        }
      ]);
      expect(component.isNoNextPage).toBe(false);
    });
  });
});
