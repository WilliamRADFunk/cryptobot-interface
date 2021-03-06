import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

import { NgbModule, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { ChartModule } from 'angular-highcharts';

import { FilterControlsComponent } from './filter-controls.component';
import { GdaxDataService } from '../../services/gdax-data.service';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

let gdaxDataService;
let activatedRouter;
const date1 = new Date('2018-03-25T03:55:00.000Z');
const date2 = new Date('2018-03-26T03:55:00.000Z');
const reallyOldDate = new Date(
  new Date('2018-03-26T03:55:00.000Z').getTime()
  - 25833600000);
let shortDate1: { year: number, month: number, day: number} = {
  year: null,
  month: null,
  day: null
};
shortDate1 = {
  year: date1.getFullYear(),
  month: date1.getMonth() + 1,
  day: date1.getDate()
};
let shortTime1: { hour: number, minute: number } = {
  hour: null,
  minute: null
};
shortTime1 = {
  hour: date1.getHours(),
  minute: date1.getMinutes()
};
let shortDate2: { year: number, month: number, day: number} = {
  year: null,
  month: null,
  day: null
};
shortDate2 = {
  year: date2.getFullYear(),
  month: date2.getMonth() + 1,
  day: date2.getDate()
};
let shortTime2: { hour: number, minute: number } = {
  hour: null,
  minute: null
};
shortTime2 = {
  hour: date2.getHours(),
  minute: date2.getMinutes()
};
const shortDate3: { year: number, month: number, day: number} = {
  year: reallyOldDate.getFullYear(),
  month: reallyOldDate.getMonth() + 1,
  day: reallyOldDate.getDate()
};
const shortTime3: { hour: number, minute: number } = {
  hour: reallyOldDate.getHours(),
  minute: reallyOldDate.getMinutes()
};

describe('FilterControlsComponent', () => {
  let component: FilterControlsComponent;
  let fixture: ComponentFixture<FilterControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        NgbModule.forRoot(),
        ChartModule
      ],
      declarations: [ FilterControlsComponent ],
      providers: [
        {
          provide: Router,
          useClass: class { navigate: {} = jasmine.createSpy('navigate'); }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {children: [{url: ['BTC-USD']}]},
            queryParamMap: Observable.of({
              get: (key) => {
                if (key === 'endDateTime') {
                  return date2.toISOString();
                } else if (key === 'granularity') {
                  return 3600;
                } else if (key === 'startDateTime') {
                  return date1.toISOString();
                }
              },
              has: (key) => {
                if (key === 'endDateTime') {
                  return true;
                } else if (key === 'granularity') {
                  return true;
                } else if (key === 'startDateTime') {
                  return true;
                }
              }
            })
          }
        },
        {
          provide: GdaxDataService,
          useValue: {
            changeTimeInterval: (value) => {
              return { };
            },
            changeStartDateTime: () => {
              return { };
            },
            changeEndDateTime: () => {
              return { };
            },
            getEndDateTime: () => {
              return null;
            },
            getStartDateTime: () => {
              return null;
            },
            interval: 3600,
            isBusy: {
              subscribe: fn => {
                fn(true);
              }
            },
            isRelevant: {
              subscribe: fn => {
                fn(true);
              }
            }
          }
        }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    });
    gdaxDataService = TestBed.get(GdaxDataService);
    activatedRouter = TestBed.get(ActivatedRoute);
  }));

  beforeEach(() => {
    spyOn(gdaxDataService, 'changeTimeInterval').and.callThrough();
    spyOn(gdaxDataService, 'changeEndDateTime').and.callThrough();
    spyOn(gdaxDataService, 'changeStartDateTime').and.callThrough();
    fixture = TestBed.createComponent(FilterControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('changedTimeInterval', () => {
    it(`should change timeInterval and timeIntervalLabel,
      plus call gdaxDataService.changeTimeInterval with expected granularity value
      and updateParams`, () => {
      spyOn(component, 'updateParams').and.returnValue(true);
      component.isRelevant = true;
      component.changedTimeInterval({label: '6 hours', value: 21600});
      expect(component.timeInterval).toBe(21600);
      expect(component.timeIntervalLabel).toBe('6 hours');
      expect(component.updateParams).toHaveBeenCalled();
      expect(gdaxDataService.changeTimeInterval).toHaveBeenCalledWith(21600, undefined);
    });
    it(`should change timeInterval and timeIntervalLabel,
      plus call gdaxDataService.changeTimeInterval with expected granularity value
      and updateParams`, () => {
      spyOn(component, 'updateParams').and.returnValue(true);
      component.isRelevant = true;
      component.changedTimeInterval({label: '1 hour', value: 3600}, true);
      expect(component.timeInterval).toBe(3600);
      expect(component.timeIntervalLabel).toBe('1 hour');
      expect(component.updateParams).not.toHaveBeenCalled();
      expect(gdaxDataService.changeTimeInterval).toHaveBeenCalledWith(3600, true);
    });
    it(`should change timeInterval and timeIntervalLabel,
      plus call gdaxDataService.changeTimeInterval with expected granularity value
      and not updateParams`, () => {
      spyOn(component, 'updateParams').and.returnValue(true);
      component.isRelevant = false;
      component.changedTimeInterval({label: '1 hour', value: 3600}, true);
      expect(component.timeInterval).toBe(3600);
      expect(component.timeIntervalLabel).toBe('1 hour');
      expect(component.updateParams).not.toHaveBeenCalled();
      expect(gdaxDataService.changeTimeInterval).toHaveBeenCalledWith(3600, true);
    });
  });
  describe('onEndDateTimeChange', () => {
    beforeEach(() => {
      spyOn(component, 'adjustGranularityOptions').and.returnValue(true);
      spyOn(component, 'closeTooltip').and.returnValue(true);
      spyOn(component, 'openTooltip').and.returnValue(true);
      spyOn(component, 'resetMinMax').and.returnValue(true);
    });
    it(`should return without doing anything`, () => {
      spyOn(component, 'checkValidDateTime').and.returnValue(true);
      component.eDate = shortDate2;
      component.eTime = shortTime2;
      component.invalidEndDatetime = true;
      component.invalidStartDatetime = true;
      component.isInitialized = false;
      component.onEndDateTimeChange();
      expect(component.invalidEndDatetime).toBe(true);
      expect(component.invalidStartDatetime).toBe(true);
      expect(component.closeTooltip).not.toHaveBeenCalled();
      expect(component.resetMinMax).not.toHaveBeenCalled();
      expect(component.openTooltip).not.toHaveBeenCalled();
      expect(component.closeTooltip).not.toHaveBeenCalled();
      expect(component.adjustGranularityOptions).not.toHaveBeenCalled();
    });
    it(`should call gdaxDataService.changeEndDateTime with expected date,
      and set warning flags to false.`, () => {
      spyOn(component, 'checkValidDateTime').and.returnValue(true);
      component.eDate = shortDate2;
      component.eTime = shortTime2;
      component.onEndDateTimeChange();
      expect(component.invalidEndDatetime).toBe(false);
      expect(component.invalidStartDatetime).toBe(false);
      expect(component.closeTooltip).toHaveBeenCalled();
      expect(component.resetMinMax).toHaveBeenCalled();
      expect(component.openTooltip).not.toHaveBeenCalled();
      expect(component.adjustGranularityOptions).toHaveBeenCalled();
      expect(gdaxDataService.changeEndDateTime).toHaveBeenCalledWith(date2);
    });
    it(`should not call gdaxDataService.changeEndDateTime with expected date,
      and set end datetime warning flag to true.`, () => {
      spyOn(component, 'checkValidDateTime').and.returnValue(false);
      component.onEndDateTimeChange();
      expect(component.invalidEndDatetime).toBe(true);
      expect(component.invalidStartDatetime).toBe(false);
      expect(component.closeTooltip).not.toHaveBeenCalled();
      expect(component.resetMinMax).not.toHaveBeenCalled();
      expect(component.openTooltip).toHaveBeenCalled();
      expect(component.adjustGranularityOptions).not.toHaveBeenCalled();
      expect(gdaxDataService.changeEndDateTime).not.toHaveBeenCalledWith(date2);
    });
  });
  describe('onStartDateTimeChange', () => {
    beforeEach(() => {
      spyOn(component, 'adjustGranularityOptions').and.returnValue(true);
      spyOn(component, 'closeTooltip').and.returnValue(true);
      spyOn(component, 'openTooltip').and.returnValue(true);
      spyOn(component, 'resetMinMax').and.returnValue(true);
    });
    it(`should return without doing anything`, () => {
      spyOn(component, 'checkValidDateTime').and.returnValue(true);
      component.eDate = shortDate1;
      component.eTime = shortTime1;
      component.invalidEndDatetime = true;
      component.invalidStartDatetime = true;
      component.isInitialized = false;
      component.onStartDateTimeChange();
      expect(component.invalidEndDatetime).toBe(true);
      expect(component.invalidStartDatetime).toBe(true);
      expect(component.closeTooltip).not.toHaveBeenCalled();
      expect(component.resetMinMax).not.toHaveBeenCalled();
      expect(component.openTooltip).not.toHaveBeenCalled();
      expect(component.closeTooltip).not.toHaveBeenCalled();
      expect(component.adjustGranularityOptions).not.toHaveBeenCalled();
    });
    it(`should call gdaxDataService.changeStartDateTime with expected date,
    and set warning flags to false.`, () => {
      spyOn(component, 'checkValidDateTime').and.returnValue(true);
      component.sDate = shortDate1;
      component.sTime = shortTime1;
      component.onStartDateTimeChange();
      expect(component.invalidEndDatetime).toBe(false);
      expect(component.invalidStartDatetime).toBe(false);
      expect(component.closeTooltip).toHaveBeenCalled();
      expect(component.resetMinMax).toHaveBeenCalled();
      expect(component.openTooltip).not.toHaveBeenCalled();
      expect(gdaxDataService.changeStartDateTime).toHaveBeenCalledWith(date1);
    });
    it(`should call gdaxDataService.changeStartDateTime with expected date,
    and set start datetime warning flag to true.`, () => {
      spyOn(component, 'checkValidDateTime').and.returnValue(false);
      component.onStartDateTimeChange();
      expect(component.invalidEndDatetime).toBe(false);
      expect(component.invalidStartDatetime).toBe(true);
      expect(component.closeTooltip).not.toHaveBeenCalled();
      expect(component.resetMinMax).not.toHaveBeenCalled();
      expect(component.openTooltip).toHaveBeenCalled();
      expect(component.adjustGranularityOptions).not.toHaveBeenCalled();
      expect(gdaxDataService.changeStartDateTime).not.toHaveBeenCalledWith(date1);
    });
  });
  describe('checkValidYear', () => {
    const tempDate: { year: number, month: number, day: number} = {
      year: null,
      month: null,
      day: null
    };
    beforeEach(() => {
      tempDate['year'] = shortDate1['year'];
      tempDate['month'] = shortDate1['month'];
      tempDate['day'] = shortDate1['day'];
    });
    it(`should return false`, () => {
      expect(component.checkValidYear(null)).toBe(false);
    });
    it(`should return false`, () => {
      expect(component.checkValidYear(undefined)).toBe(false);
    });
    it(`should return false`, () => {
      tempDate['year'] = 1969;
      expect(component.checkValidYear(tempDate)).toBe(false);
    });
    it(`should return false`, () => {
      tempDate['year'] = 2200;
      expect(component.checkValidYear(tempDate)).toBe(false);
    });
    it(`should return true`, () => {
      tempDate['year'] = 2008;
      expect(component.checkValidYear(tempDate)).toBe(true);
    });
    it(`should return true`, () => {
      tempDate['year'] = 2018;
      expect(component.checkValidYear(tempDate)).toBe(true);
    });
  });
  describe('checkValidMonth', () => {
    const tempDate: { year: number, month: number, day: number} = {
      year: null,
      month: null,
      day: null
    };
    beforeEach(() => {
      tempDate['year'] = shortDate1['year'];
      tempDate['month'] = shortDate1['month'];
      tempDate['day'] = shortDate1['day'];
    });
    it(`should return false`, () => {
      expect(component.checkValidMonth(null)).toBe(false);
    });
    it(`should return false`, () => {
      expect(component.checkValidMonth(undefined)).toBe(false);
    });
    it(`should return false`, () => {
      tempDate['month'] = 0;
      expect(component.checkValidMonth(tempDate)).toBe(false);
    });
    it(`should return false`, () => {
      tempDate['month'] = 13;
      expect(component.checkValidMonth(tempDate)).toBe(false);
    });
    it(`should return true`, () => {
      tempDate['month'] = 1;
      expect(component.checkValidMonth(tempDate)).toBe(true);
    });
    it(`should return true`, () => {
      tempDate['month'] = 12;
      expect(component.checkValidMonth(tempDate)).toBe(true);
    });
    it(`should return true`, () => {
      tempDate['month'] = 3;
      expect(component.checkValidMonth(tempDate)).toBe(true);
    });
  });
  describe('checkValidMinutes', () => {
    const tempTime: { hour: number, minute: number } = {
      hour: null,
      minute: null
    };
    beforeEach(() => {
      tempTime['hour'] = shortTime1['hour'];
      tempTime['minute'] = shortTime1['minute'];
    });
    it(`should return false`, () => {
      expect(component.checkValidMinutes(null)).toBe(false);
    });
    it(`should return false`, () => {
      expect(component.checkValidMinutes(undefined)).toBe(false);
    });
    it(`should return false`, () => {
      tempTime['minute'] = -1;
      expect(component.checkValidMinutes(tempTime)).toBe(false);
    });
    it(`should return false`, () => {
      tempTime['minute'] = 60;
      expect(component.checkValidMinutes(tempTime)).toBe(false);
    });
    it(`should return true`, () => {
      tempTime['minute'] = 0;
      expect(component.checkValidMinutes(tempTime)).toBe(true);
    });
    it(`should return true`, () => {
      tempTime['minute'] = 59;
      expect(component.checkValidMinutes(tempTime)).toBe(true);
    });
    it(`should return true`, () => {
      tempTime['minute'] = '00' as any;
      expect(component.checkValidMinutes(tempTime)).toBe(true);
    });
  });
  describe('checkValidHours', () => {
    const tempTime: { hour: number, minute: number } = {
      hour: null,
      minute: null
    };
    beforeEach(() => {
      tempTime['hour'] = shortTime1['hour'];
      tempTime['minute'] = shortTime1['minute'];
    });
    it(`should return false`, () => {
      expect(component.checkValidHours(null)).toBe(false);
    });
    it(`should return false`, () => {
      expect(component.checkValidHours(undefined)).toBe(false);
    });
    it(`should return false`, () => {
      tempTime['hour'] = -1;
      expect(component.checkValidHours(tempTime)).toBe(false);
    });
    it(`should return false`, () => {
      tempTime['hour'] = 24;
      expect(component.checkValidHours(tempTime)).toBe(false);
    });
    it(`should return true`, () => {
      tempTime['hour'] = 0;
      expect(component.checkValidHours(tempTime)).toBe(true);
    });
    it(`should return true`, () => {
      tempTime['hour'] = 23;
      expect(component.checkValidHours(tempTime)).toBe(true);
    });
    it(`should return true`, () => {
      tempTime['hour'] = '00' as any;
      expect(component.checkValidHours(tempTime)).toBe(true);
    });
  });
  describe('checkValidDay', () => {
    const tempDate: { year: number, month: number, day: number} = {
      year: null,
      month: null,
      day: null
    };
    beforeEach(() => {
      tempDate['year'] = shortDate1['year'];
      tempDate['month'] = shortDate1['month'];
      tempDate['day'] = shortDate1['day'];
    });
    it(`should return false`, () => {
      expect(component.checkValidDay(null)).toBe(false);
    });
    it(`should return false`, () => {
      expect(component.checkValidDay(undefined)).toBe(false);
    });
    it(`should return false`, () => {
      tempDate['day'] = 0;
      expect(component.checkValidDay(tempDate)).toBe(false);
    });
    it(`should return false`, () => {
      tempDate['day'] = 32;
      expect(component.checkValidDay(tempDate)).toBe(false);
    });
    it(`should return true`, () => {
      tempDate['day'] = 1;
      expect(component.checkValidDay(tempDate)).toBe(true);
    });
    it(`should return true`, () => {
      tempDate['day'] = 31;
      expect(component.checkValidDay(tempDate)).toBe(true);
    });
    it(`should return true`, () => {
      tempDate['day'] = 26;
      expect(component.checkValidDay(tempDate)).toBe(true);
    });
  });
  describe('checkValidDateTimeOrder', () => {
    it(`should return false`, () => {
      component.sDate = shortDate1;
      component.sTime = shortTime1;
      component.eDate = shortDate1;
      component.eTime = shortTime1;
      component.eTime['minute'] = shortTime1['minute'] + 9;
      expect(component.checkValidDateTimeOrder()).toBe(false);
    });
    it(`should return false`, () => {
      component.sDate = shortDate1;
      component.sTime = shortTime1;
      component.eDate['year'] = new Date().getFullYear();
      component.eDate['month'] = new Date().getMonth() + 1;
      component.eDate['day'] = new Date().getDate();
      component.eTime['hour'] = new Date().getHours();
      component.eTime['minute'] = new Date().getMinutes() + 11;
      const result = component.checkValidDateTimeOrder();
      component.eDate = shortDate1;
      component.eTime = shortTime1;
      expect(result).toBe(false);
    });
    it(`should return false`, () => {
      component.sDate = shortDate3;
      component.sTime = shortTime3;
      component.eDate = shortDate2;
      component.eTime = shortTime2;
      expect(component.checkValidDateTimeOrder()).toBe(false);
    });
    it(`should return false`, () => {
      component.sDate = shortDate2;
      component.sTime = shortTime2;
      component.eDate = shortDate1;
      component.eTime = shortTime1;
      expect(component.checkValidDateTimeOrder()).toBe(false);
    });
    it(`should return false`, () => {
      component.sDate = shortDate2;
      component.sTime = shortTime2;
      component.eDate = shortDate2;
      component.eTime = shortTime2;
      expect(component.checkValidDateTimeOrder()).toBe(false);
    });
    it(`should return true`, () => {
      component.sDate = shortDate1;
      component.sTime = shortTime1;
      component.eDate = shortDate2;
      component.eTime = shortTime2;
      expect(component.checkValidDateTimeOrder()).toBe(true);
    });
  });
  describe('checkValidDateTime', () => {
    it(`should return true`, () => {
      spyOn(component, 'checkValidYear').and.returnValue(true);
      spyOn(component, 'checkValidMonth').and.returnValue(true);
      spyOn(component, 'checkValidDay').and.returnValue(true);
      spyOn(component, 'checkValidHours').and.returnValue(true);
      spyOn(component, 'checkValidMinutes').and.returnValue(true);
      spyOn(component, 'checkValidDateTimeOrder').and.returnValue(true);
      expect(component.checkValidDateTime()).toBe(true);
    });
    it(`should return false`, () => {
      spyOn(component, 'checkValidYear').and.returnValues(true, false);
      spyOn(component, 'checkValidMonth').and.returnValue(true);
      spyOn(component, 'checkValidDay').and.returnValue(true);
      spyOn(component, 'checkValidHours').and.returnValue(true);
      spyOn(component, 'checkValidMinutes').and.returnValue(true);
      spyOn(component, 'checkValidDateTimeOrder').and.returnValue(true);
      expect(component.checkValidDateTime()).toBe(false);
    });
    it(`should return false`, () => {
      spyOn(component, 'checkValidYear').and.returnValues(true, true);
      spyOn(component, 'checkValidMonth').and.returnValues(true, false);
      spyOn(component, 'checkValidDay').and.returnValue(true);
      spyOn(component, 'checkValidHours').and.returnValue(true);
      spyOn(component, 'checkValidMinutes').and.returnValue(true);
      spyOn(component, 'checkValidDateTimeOrder').and.returnValue(true);
      expect(component.checkValidDateTime()).toBe(false);
    });
    it(`should return false`, () => {
      spyOn(component, 'checkValidYear').and.returnValues(true, true);
      spyOn(component, 'checkValidMonth').and.returnValues(true, true);
      spyOn(component, 'checkValidDay').and.returnValues(true, false);
      spyOn(component, 'checkValidHours').and.returnValue(true);
      spyOn(component, 'checkValidMinutes').and.returnValue(true);
      spyOn(component, 'checkValidDateTimeOrder').and.returnValue(true);
      expect(component.checkValidDateTime()).toBe(false);
    });
    it(`should return false`, () => {
      spyOn(component, 'checkValidYear').and.returnValues(true, true);
      spyOn(component, 'checkValidMonth').and.returnValues(true, true);
      spyOn(component, 'checkValidDay').and.returnValues(true, true);
      spyOn(component, 'checkValidHours').and.returnValues(true, false);
      spyOn(component, 'checkValidMinutes').and.returnValue(true);
      spyOn(component, 'checkValidDateTimeOrder').and.returnValue(true);
      expect(component.checkValidDateTime()).toBe(false);
    });
    it(`should return false`, () => {
      spyOn(component, 'checkValidYear').and.returnValues(true, true);
      spyOn(component, 'checkValidMonth').and.returnValues(true, true);
      spyOn(component, 'checkValidDay').and.returnValues(true, true);
      spyOn(component, 'checkValidHours').and.returnValues(true, true);
      spyOn(component, 'checkValidMinutes').and.returnValues(true, false);
      spyOn(component, 'checkValidDateTimeOrder').and.returnValue(true);
      expect(component.checkValidDateTime()).toBe(false);
    });
  });
  describe('adjustGranularityOptions', () => {
    it(`should not call changedTimeInterval, and alter granularity list`, () => {
      spyOn(component, 'changedTimeInterval').and.returnValue(true);
      component.sDate = shortDate1;
      component.sTime = shortTime1;
      component.eDate = shortDate2;
      component.eTime = shortTime2;
      component.adjustGranularityOptions();
      expect(component.changedTimeInterval).not.toHaveBeenCalled();
      expect(component.timeInterval).toBe(3600);
      expect(component.timeIntervalLabel).toBe('1 hour');
      expect(component.timeIntervals).toEqual([
        {
          label: '5 minutes',
          value: 300
        },
        {
          label: '15 minutes',
          value: 900
        },
        {
          label: '1 hour',
          value: 3600
        },
        {
          label: '6 hours',
          value: 21600
        }
      ]);
    });
    it(`should call changedTimeInterval, and alter granularity list`, () => {
      spyOn(component, 'changedTimeInterval').and.returnValue(true);
      shortDate1['day'] -= 14;
      component.sDate = shortDate1;
      component.sTime = shortTime1;
      component.eDate = shortDate2;
      component.eTime = shortTime2;
      component.adjustGranularityOptions();
      expect(component.changedTimeInterval).toHaveBeenCalled();
      expect(component.timeInterval).toBe(21600);
      expect(component.timeIntervalLabel).toBe('6 hours');
      expect(component.timeIntervals).toEqual([
        {
          label: '6 hours',
          value: 21600
        },
        {
          label: '1 day',
          value: 86400
        }
      ]);
    });
  });
  describe('closeTooltip', () => {
    let spy1;
    let spy2;
    let spy3;
    beforeEach( () => {
      const tooltip = {
        isOpen: () => {
          return true;
        },
        open: () => {
          return true;
        },
        close: () => {
          return true;
        }
      };
      component.tooltip = tooltip as any;
      spy1 = spyOn(component.tooltip, 'isOpen').and.callThrough();
      spy2 = spyOn(component.tooltip, 'open').and.returnValue(true);
      spy3 = spyOn(component.tooltip, 'close').and.returnValue(true);
    });
    it(`should call isOpen and close on tooltip`, () => {
      component.closeTooltip();
      expect(component.tooltip.isOpen).toHaveBeenCalled();
      expect(component.tooltip.close).toHaveBeenCalled();
      expect(component.tooltip.open).not.toHaveBeenCalled();
    });
    it(`should call isOpen and close on tooltip`, () => {
      spy1.and.returnValue(false);
      component.closeTooltip();
      expect(component.tooltip.isOpen).toHaveBeenCalled();
      expect(component.tooltip.close).not.toHaveBeenCalled();
      expect(component.tooltip.open).not.toHaveBeenCalled();
    });
  });
  describe('openTooltip', () => {
    let spy1;
    let spy2;
    let spy3;
    beforeEach( () => {
      const tooltip = {
        isOpen: () => {
          return false;
        },
        open: () => {
          return true;
        },
        close: () => {
          return true;
        }
      };
      component.tooltip = tooltip as any;
      spy1 = spyOn(component.tooltip, 'isOpen').and.callThrough();
      spy2 = spyOn(component.tooltip, 'open').and.returnValue(true);
      spy3 = spyOn(component.tooltip, 'close').and.returnValue(true);
    });
    it(`should call isOpen and open on tooltip`, () => {
      component.openTooltip();
      expect(component.tooltip.isOpen).toHaveBeenCalled();
      expect(component.tooltip.close).not.toHaveBeenCalled();
      expect(component.tooltip.open).toHaveBeenCalled();
    });
    it(`should call isOpen and open on tooltip`, () => {
      spy1.and.returnValue(true);
      component.openTooltip();
      expect(component.tooltip.isOpen).toHaveBeenCalled();
      expect(component.tooltip.close).not.toHaveBeenCalled();
      expect(component.tooltip.open).not.toHaveBeenCalled();
    });
  });
  describe('resetMinMax', () => {
    it(`should set min and max dates for start and end datetimes`, () => {
      const newDate = new Date();
      const newMaxEndDate = {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        day: new Date().getDate()
      } as any;
      const newMaxStartDate = {
        year: component.eDate['year'],
        month: component.eDate['month'],
        day: component.eDate['day']
      } as any;
      const newMinEndDate = {
        year: component.sDate['year'],
        month: component.sDate['month'],
        day: component.sDate['day']
      } as any;
      const afterDate = new Date(
        component.eDate.year,
        component.eDate.month - 1,
        component.eDate.day,
        component.eTime.hour,
        component.eTime.minute);
      const earliestDate = new Date(afterDate.getTime() - 25833600000);
      const newMinStartDate = {
        year: earliestDate.getFullYear(),
        month: earliestDate.getMonth() + 1,
        day: earliestDate.getDate()
      } as any;
      component.resetMinMax();
      expect(component.maxEndDate).toEqual(newMaxEndDate);
      expect(component.minEndDate).toEqual(newMinEndDate);
      expect(component.maxStartDate).toEqual(newMaxStartDate);
      expect(component.minStartDate).toEqual(newMinStartDate);
    });
  });
  describe('isTooltipOpen', () => {
    let spy1;
    beforeEach( () => {
      const tooltip = {
        isOpen: () => {
          return false;
        },
        open: () => {
          return true;
        },
        close: () => {
          return true;
        }
      };
      component.tooltip = tooltip as any;
      spy1 = spyOn(component.tooltip, 'isOpen').and.callThrough();
    });
    it(`should return false`, () => {
      expect(component.isTooltipOpen()).toBe(false);
    });
    it(`should return true`, () => {
      spy1.and.returnValue(true);
      expect(component.isTooltipOpen()).toBe(true);
    });
  });
  describe('handleEndDateTimeParam', () => {
    beforeEach( () => {
      component.params = {
        get: (key) => {
          return reallyOldDate.toISOString();
        },
        has: (key) => {
          return true;
        },
        getAll: () => [''],
        keys: ['']
      };
    });
    it(`should call changeEndDateTime with expected datetime and true`, () => {
      component.handleEndDateTimeParam();
      expect(gdaxDataService.changeEndDateTime)
        .toHaveBeenCalledWith(reallyOldDate, true);
    });
    it(`should call changeEndDateTime with expected datetime and true`, () => {
      component.params['get'] = (key) => {
        return 'doug';
      };
      component.endDate = date2;
      component.handleEndDateTimeParam();
      expect(gdaxDataService.changeEndDateTime)
        .toHaveBeenCalledWith(date2, true);
    });
    it(`should call changeEndDateTime with expected datetime and true`, () => {
      component.params['has'] = (key) => {
          return false;
      };
      component.endDate = date2;
      component.handleEndDateTimeParam();
      expect(gdaxDataService.changeEndDateTime)
        .toHaveBeenCalledWith(date2, true);
    });
  });
  describe('handleStartDateTimeParam', () => {
    beforeEach( () => {
      component.params = {
        get: (key) => {
          return reallyOldDate.toISOString();
        },
        has: (key) => {
          return true;
        },
        getAll: () => [''],
        keys: ['']
      };
    });
    it(`should call changeStartDateTime with expected datetime and true`, () => {
      component.handleStartDateTimeParam();
      expect(gdaxDataService.changeStartDateTime)
        .toHaveBeenCalledWith(reallyOldDate, true);
    });
    it(`should call changeStartDateTime with expected datetime and true`, () => {
      component.params['get'] = (key) => {
        return 'doug';
      };
      component.startDate = date1;
      component.handleStartDateTimeParam();
      expect(gdaxDataService.changeStartDateTime)
        .toHaveBeenCalledWith(date1, true);
    });
    it(`should call changeStartDateTime with expected datetime and true`, () => {
      component.params['has'] = (key) => {
          return false;
      };
      component.startDate = date1;
      component.handleStartDateTimeParam();
      expect(gdaxDataService.changeStartDateTime)
        .toHaveBeenCalledWith(date1, true);
    });
  });
  describe('handleIncorrectDateTimeParams', () => {
    beforeEach( () => {
      spyOn(component, 'setADateTime').and.returnValue(true);
      component.endDate = reallyOldDate;
      component.startDate = reallyOldDate;
    });
    it(`should call nothing`, () => {
      spyOn(component, 'checkValidDateTime').and.returnValue(true);
      component.handleIncorrectDateTimeParams();
      expect(component.endDate.toString()).toBe(reallyOldDate.toString());
      expect(component.startDate.toString()).toBe(reallyOldDate.toString());
      expect(component.setADateTime).not.toHaveBeenCalled();
    });
    it(`should datetimes to default, and call service for update`, () => {
      spyOn(component, 'checkValidDateTime').and.returnValue(false);
      component.handleIncorrectDateTimeParams();
      expect(component.endDate.toString()).not.toBe(reallyOldDate.toString());
      expect(component.startDate.toString()).not.toBe(reallyOldDate.toString());
      expect(component.setADateTime).toHaveBeenCalled();
    });
  });
  describe('handleGranularityParam', () => {
    beforeEach( () => {
      component.params = {
        get: (key) => {
          return '21600';
        },
        has: (key) => {
          return true;
        },
        getAll: () => [''],
        keys: ['']
      };
    });
    it(`should call adjustGranularityOptions and set timeIntervalLabel to 6 hours`, () => {
      spyOn(component, 'adjustGranularityOptions').and.returnValue(true);
      component.isRelevant = true;
      component.timeIntervalLabel = 'doug';
      component.handleGranularityParam();
      expect(component.timeIntervalLabel).toBe('6 hours');
      expect(component.adjustGranularityOptions).toHaveBeenCalledWith(true);
    });
    it(`should call adjustGranularityOptions and not set timeIntervalLabel`, () => {
      spyOn(component, 'adjustGranularityOptions').and.returnValue(true);
      component.isRelevant = false;
      component.timeIntervalLabel = 'doug';
      component.handleGranularityParam();
      expect(component.timeIntervalLabel).toBe('doug');
      expect(component.adjustGranularityOptions).toHaveBeenCalledWith(true);
    });
    it(`should call adjustGranularityOptions and not set timeIntervalLabel`, () => {
      spyOn(component, 'adjustGranularityOptions').and.returnValue(true);
      component.isRelevant = false;
      component.timeIntervalLabel = 'doug';
      component.params['get'] = (key) => {
        return 'bob';
      };
      component.handleGranularityParam();
      expect(component.timeIntervalLabel).toBe('doug');
      expect(component.adjustGranularityOptions).toHaveBeenCalledWith(true);
    });
    it(`should call adjustGranularityOptions and not set timeIntervalLabel`, () => {
      spyOn(component, 'adjustGranularityOptions').and.returnValue(true);
      component.isRelevant = false;
      component.timeIntervalLabel = 'doug';
      component.params['has'] = (key) => {
        return false;
      };
      component.handleGranularityParam();
      expect(component.timeIntervalLabel).toBe('doug');
      expect(component.adjustGranularityOptions).toHaveBeenCalledWith(true);
    });
  });
  describe('handleInitialParamUpdate', () => {
    it(`should call adjustGrto 6 hours`, () => {
      spyOn(component, 'updateParams').and.returnValue(true);
      component.isRelevant = true;
      component.handleInitialParamUpdate();
      expect(component.updateParams).toHaveBeenCalledWith({
        endDateTime: '2018-03-26T03:55:00.000Z',
        granularity: 3600,
        startDateTime: '2018-03-25T03:55:00.000Z'
      });
    });
    it(`should call adjustGrto 6 hours`, () => {
      spyOn(component, 'updateParams').and.returnValue(true);
      component.isRelevant = false;
      component.handleInitialParamUpdate();
      expect(component.updateParams).toHaveBeenCalledWith({
        endDateTime: '2018-03-26T03:55:00.000Z',
        granularity: null,
        startDateTime: '2018-03-25T03:55:00.000Z'
      });
    });
  });
});
